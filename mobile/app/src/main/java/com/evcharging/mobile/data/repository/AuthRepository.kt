package com.evcharging.mobile.data.repository

import com.evcharging.mobile.data.api.ApiService
import com.evcharging.mobile.data.local.DataStoreManager
import com.evcharging.mobile.data.model.AuthResponse
import com.evcharging.mobile.data.model.LoginRequest
import com.evcharging.mobile.data.model.RegisterRequest
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AuthRepository @Inject constructor(
    private val apiService: ApiService,
    private val dataStoreManager: DataStoreManager
) {
    suspend fun login(email: String, password: String): Result<AuthResponse> {
        return try {
            val response = apiService.login(LoginRequest(email, password))
            if (response.isSuccessful && response.body()?.success == true) {
                val authResponse = response.body()!!.data!!
                // Save to local storage
                dataStoreManager.saveAuthToken(authResponse.token)
                dataStoreManager.saveUserInfo(
                    authResponse.userId,
                    authResponse.email,
                    authResponse.fullName,
                    authResponse.role
                )
                Result.success(authResponse)
            } else {
                val errorMessage = response.body()?.message ?: "Đăng nhập thất bại"
                Result.failure(Exception(errorMessage))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    suspend fun register(
        email: String,
        password: String,
        fullName: String,
        phoneNumber: String?
    ): Result<AuthResponse> {
        return try {
            val response = apiService.register(RegisterRequest(email, password, fullName, phoneNumber))
            if (response.isSuccessful && response.body()?.success == true) {
                val authResponse = response.body()!!.data!!
                // Save to local storage
                dataStoreManager.saveAuthToken(authResponse.token)
                dataStoreManager.saveUserInfo(
                    authResponse.userId,
                    authResponse.email,
                    authResponse.fullName,
                    authResponse.role
                )
                Result.success(authResponse)
            } else {
                val errorMessage = response.body()?.message ?: "Đăng ký thất bại"
                Result.failure(Exception(errorMessage))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    suspend fun getAuthToken(): String? {
        return dataStoreManager.getAuthToken().first()
    }
    
    suspend fun logout() {
        dataStoreManager.clearAll()
    }
    
    suspend fun isLoggedIn(): Boolean {
        return getAuthToken() != null
    }
}

