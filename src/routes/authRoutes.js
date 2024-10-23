import express from 'express';
import { signUp, login } from '../controllers/authController.js';
import { requestPasswordReset ,verifyOtpAndResetPassword ,requestPassword,resetPasswordVerify} from '../controllers/passwordResetController.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', login);

router.post('/reset-password', requestPasswordReset);
router.post('/verify-otp', verifyOtpAndResetPassword);

router.post('/request-reset-password', requestPassword);

router.post('/reset-password-set-verify',resetPasswordVerify)

export default router;
