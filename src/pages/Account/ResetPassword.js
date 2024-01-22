import React, {useState} from 'react';
import {X} from 'phosphor-react';
import {useDispatch, useSelector} from 'react-redux';
import {
    sendOtpAsync,
    resetPasswordAsync,
    openResetPasswordOtpDialog,
} from '../../features/user/authSilce';
import {Link} from 'react-router-dom';
import '../../assets/css/ForgotPassword.css';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const sendOtpStatus = useSelector((state) => state.auth.sendOtpStatus);
    const verifyOtpForForgotPasswordStatus = useSelector(
        (state) => state.auth.verifyOtpForForgotPasswordStatus
    );
    const resetPasswordOtpDialogVisible = useSelector(
        (state) => state.auth.resetPasswordOtpDialogVisible
    );

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [validation, setValidation] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (value) => {
        setEmail(value);

        if (!validateEmail(value)) {
            setError('Invalid email address');
        } else {
            setError('');
        }
    };

    const handlePasswordChange = (value) => {
        setNewPassword(value);

        if (!validatePassword(value)) {
            setValidation(
                'Password must be at least 6 characters and contain at least one digit and one uppercase letter'
            );
        } else if (passwordConfirmation && value !== passwordConfirmation) {
            setValidation('Password and confirmation do not match');
        } else {
            setValidation('');
        }
    };

    const handleConfirmationChange = (value) => {
        setPasswordConfirmation(value);

        if (value !== newPassword) {
            setValidation('Password and confirmation do not match');
        } else {
            setValidation('');
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSendEmail = () => {
        if (!validateEmail(email)) {
            setError('Invalid email address');
            return;
        }

        setError('');
        setValidation('');

        dispatch(sendOtpAsync({email}));
        dispatch(openResetPasswordOtpDialog());
    };

    const handleVerifyOtpAndResetPassword = () => {
        if (!validatePassword(newPassword)) {
            setValidation(
                'Password must be at least 6 characters and contain at least one digit and one uppercase letter'
            );
            return;
        }

        if (newPassword !== passwordConfirmation) {
            setValidation('Password and confirmation do not match');
            return;
        }

        setValidation('');

        const verifyOtpRequest = {
            email,
            otp,
            newPassword,
        };
        dispatch(resetPasswordAsync(verifyOtpRequest));
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
        return regex.test(password);
    };

    return (
        <div className="container-forgot">
            <div className="title">
                <p className="forgot">Forgot password</p>
                <X size={20} color="#505c8c" weight="light"/>
            </div>

            <div className="body">
                {resetPasswordOtpDialogVisible ? (
                    <div className="otp-dialog">
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                        />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            placeholder="New password"
                        />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={passwordConfirmation}
                            onChange={(e) => handleConfirmationChange(e.target.value)}
                            placeholder="Confirm new password"
                        />
                        {error && (
                            <p style={{color: 'red'}} className="error">
                                {error}
                            </p>
                        )}
                        {validation && (
                            <p style={{color: 'red'}} className="validation">
                                {validation}
                            </p>
                        )}
                        <label className={"show_password"}>
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={handleTogglePasswordVisibility}
                            />
                            Show Password
                        </label>
                        <button
                            onClick={handleVerifyOtpAndResetPassword}
                            disabled={
                                verifyOtpForForgotPasswordStatus === 'loading' ||
                                newPassword !== passwordConfirmation
                            }
                        >
                            Reset Password
                        </button>
                    </div>
                ) : (
                    <>
                        <input
                            type="email"
                            className="senEmail"
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            placeholder="Email"
                        />
                        <button
                            className="submit"
                            disabled={sendOtpStatus === 'loading'}
                            onClick={handleSendEmail}
                        >
                            Send
                        </button>
                        {error && (
                            <p style={{color: 'red'}} className="error">
                                {error}
                            </p>
                        )}
                    </>
                )}
                <p className="text-sm text-center font-titleFont font-medium">
                    Did you remember your password?
                    <Link to="/signin">
                        <span>Sign in</span>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;
