package com.evcharging.mobile.ui.auth

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.evcharging.mobile.data.repository.AuthRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class RegisterViewModel @Inject constructor(
    private val authRepository: AuthRepository
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(RegisterUiState())
    val uiState: StateFlow<RegisterUiState> = _uiState
    
    fun register(email: String, password: String, fullName: String, phoneNumber: String?) {
        if (email.isBlank() || password.isBlank() || fullName.isBlank()) {
            _uiState.value = _uiState.value.copy(
                error = "Vui lòng điền đầy đủ thông tin"
            )
            return
        }
        
        if (password.length < 6) {
            _uiState.value = _uiState.value.copy(
                error = "Mật khẩu phải có ít nhất 6 ký tự"
            )
            return
        }
        
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(
                isLoading = true,
                error = null
            )
            
            authRepository.register(email, password, fullName, phoneNumber)
                .onSuccess {
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        isSuccess = true
                    )
                }
                .onFailure { exception ->
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        error = exception.message ?: "Đăng ký thất bại"
                    )
                }
        }
    }
    
    fun setError(error: String) {
        _uiState.value = _uiState.value.copy(error = error)
    }
    
    fun clearError() {
        _uiState.value = _uiState.value.copy(error = null)
    }
}

data class RegisterUiState(
    val isLoading: Boolean = false,
    val isSuccess: Boolean = false,
    val error: String? = null
)

