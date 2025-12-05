package com.evcharging.mobile.data.model

import com.google.gson.annotations.SerializedName

data class ChargingSession(
    @SerializedName("id") val id: Long,
    @SerializedName("userId") val userId: Long,
    @SerializedName("stationId") val stationId: Long,
    @SerializedName("stationName") val stationName: String? = null,
    @SerializedName("chargingPointId") val chargingPointId: Long,
    @SerializedName("startTime") val startTime: String,
    @SerializedName("endTime") val endTime: String? = null,
    @SerializedName("duration") val duration: Long? = null,
    @SerializedName("energyConsumed") val energyConsumed: Double? = null,
    @SerializedName("totalCost") val totalCost: Double? = null,
    @SerializedName("status") val status: String
)

data class StartChargingRequest(
    @SerializedName("stationId") val stationId: Long,
    @SerializedName("chargingPointId") val chargingPointId: Long
)

