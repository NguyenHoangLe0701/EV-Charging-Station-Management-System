package com.evcharging.mobile.data.model

import com.google.gson.annotations.SerializedName

data class LoginRequest(
    @SerializedName("email") val email: String,
    @SerializedName("password") val password: String
)

data class RegisterRequest(
    @SerializedName("email") val email: String,
    @SerializedName("password") val password: String,
    @SerializedName("fullName") val fullName: String,
    @SerializedName("phoneNumber") val phoneNumber: String? = null
)

data class AuthResponse(
    @SerializedName("token") val token: String,
    @SerializedName("tokenType") val tokenType: String = "Bearer",
    @SerializedName("userId") val userId: Long,
    @SerializedName("email") val email: String,
    @SerializedName("fullName") val fullName: String,
    @SerializedName("role") val role: String
)

