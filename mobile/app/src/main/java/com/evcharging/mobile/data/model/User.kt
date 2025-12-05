package com.evcharging.mobile.data.model

import com.google.gson.annotations.SerializedName

data class User(
    @SerializedName("id") val id: Long,
    @SerializedName("email") val email: String,
    @SerializedName("fullName") val fullName: String,
    @SerializedName("phoneNumber") val phoneNumber: String? = null,
    @SerializedName("role") val role: String,
    @SerializedName("avatar") val avatar: String? = null
)

