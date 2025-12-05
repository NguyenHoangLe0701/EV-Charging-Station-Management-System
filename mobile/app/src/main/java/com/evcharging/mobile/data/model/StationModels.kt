package com.evcharging.mobile.data.model

import com.google.gson.annotations.SerializedName

data class Station(
    @SerializedName("id") val id: Long,
    @SerializedName("name") val name: String,
    @SerializedName("address") val address: String,
    @SerializedName("latitude") val latitude: Double,
    @SerializedName("longitude") val longitude: Double,
    @SerializedName("totalPorts") val totalPorts: Int,
    @SerializedName("availablePorts") val availablePorts: Int,
    @SerializedName("status") val status: String,
    @SerializedName("rating") val rating: Double? = null,
    @SerializedName("distance") val distance: Double? = null,
    @SerializedName("chargingPoints") val chargingPoints: List<ChargingPoint>? = null
)

data class ChargingPoint(
    @SerializedName("id") val id: Long,
    @SerializedName("stationId") val stationId: Long,
    @SerializedName("portNumber") val portNumber: Int,
    @SerializedName("connectorType") val connectorType: String,
    @SerializedName("powerRating") val powerRating: Double,
    @SerializedName("status") val status: String,
    @SerializedName("pricePerKwh") val pricePerKwh: Double
)

