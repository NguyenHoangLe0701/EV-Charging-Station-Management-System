package com.evcharging.mobile

import android.app.Application
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class EVChargingApplication : Application() {
    override fun onCreate() {
        super.onCreate()
    }
}

