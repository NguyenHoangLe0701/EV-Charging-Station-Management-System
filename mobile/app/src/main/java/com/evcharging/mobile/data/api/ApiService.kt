package com.evcharging.mobile.data.api

import com.evcharging.mobile.data.model.*
import retrofit2.Response
import retrofit2.http.*

interface ApiService {
    
    // Authentication
    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): Response<ApiResponse<AuthResponse>>
    
    @POST("auth/register")
    suspend fun register(@Body request: RegisterRequest): Response<ApiResponse<AuthResponse>>
    
    // Stations
    @GET("stations")
    suspend fun getStations(
        @Query("latitude") latitude: Double? = null,
        @Query("longitude") longitude: Double? = null,
        @Query("radius") radius: Double? = null
    ): Response<ApiResponse<List<Station>>>
    
    @GET("stations/{id}")
    suspend fun getStationById(@Path("id") id: Long): Response<ApiResponse<Station>>
    
    // Charging Sessions
    @GET("charging/sessions/user/{userId}")
    suspend fun getUserSessions(@Path("userId") userId: Long): Response<ApiResponse<List<ChargingSession>>>
    
    @GET("charging/sessions/{sessionId}")
    suspend fun getSessionById(@Path("sessionId") sessionId: Long): Response<ApiResponse<ChargingSession>>
    
    @POST("charging/sessions/start")
    suspend fun startCharging(
        @Header("Authorization") token: String,
        @Body request: StartChargingRequest
    ): Response<ApiResponse<ChargingSession>>
    
    @POST("charging/sessions/{sessionId}/stop")
    suspend fun stopCharging(
        @Header("Authorization") token: String,
        @Path("sessionId") sessionId: Long
    ): Response<ApiResponse<ChargingSession>>
    
    // Users
    @GET("users/{userId}")
    suspend fun getUserById(
        @Header("Authorization") token: String,
        @Path("userId") userId: Long
    ): Response<ApiResponse<User>>
}

