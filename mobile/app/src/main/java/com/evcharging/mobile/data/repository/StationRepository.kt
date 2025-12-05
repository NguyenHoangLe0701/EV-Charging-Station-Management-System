package com.evcharging.mobile.data.repository

import com.evcharging.mobile.data.api.ApiService
import com.evcharging.mobile.data.model.Station
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class StationRepository @Inject constructor(
    private val apiService: ApiService
) {
    suspend fun getStations(
        latitude: Double? = null,
        longitude: Double? = null,
        radius: Double? = null
    ): Result<List<Station>> {
        return try {
            val response = apiService.getStations(latitude, longitude, radius)
            if (response.isSuccessful && response.body()?.success == true) {
                Result.success(response.body()!!.data ?: emptyList())
            } else {
                Result.failure(Exception(response.body()?.message ?: "Không thể tải danh sách trạm"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    suspend fun getStationById(id: Long): Result<Station> {
        return try {
            val response = apiService.getStationById(id)
            if (response.isSuccessful && response.body()?.success == true) {
                Result.success(response.body()!!.data!!)
            } else {
                Result.failure(Exception(response.body()?.message ?: "Không thể tải thông tin trạm"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}

