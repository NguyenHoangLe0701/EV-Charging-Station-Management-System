package com.evcharging.mobile.ui.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.evcharging.mobile.data.local.DataStoreManager
import com.evcharging.mobile.data.model.Station
import com.evcharging.mobile.data.repository.StationRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class HomeViewModel @Inject constructor(
    private val stationRepository: StationRepository,
    private val dataStoreManager: DataStoreManager
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(HomeUiState())
    val uiState: StateFlow<HomeUiState> = _uiState
    
    init {
        loadUserInfo()
        loadStations()
    }
    
    private fun loadUserInfo() {
        viewModelScope.launch {
            val fullName = dataStoreManager.getUserId().first()?.let {
                // In a real app, you'd fetch full user info from API
                "Người dùng"
            } ?: "Người dùng"
            
            _uiState.value = _uiState.value.copy(userName = fullName)
        }
    }
    
    fun loadStations() {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true)
            
            stationRepository.getStations()
                .onSuccess { stations ->
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        stations = stations
                    )
                }
                .onFailure {
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        error = it.message
                    )
                }
        }
    }
}

data class HomeUiState(
    val userName: String = "",
    val stations: List<Station> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null
)

