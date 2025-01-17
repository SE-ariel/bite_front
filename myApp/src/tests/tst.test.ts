import { renderHook, act } from '@testing-library/react-hooks';
import { useLogin } from './Login';
import { signInWithEmailAndPassword, signInWithCredential } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

jest.mock('firebase/auth');
jest.mock('react-router-dom', () => ({
    useHistory: jest.fn(),
}));
jest.mock('@capacitor-firebase/authentication');

describe('useLogin', () => {
    let historyPush: jest.Mock;

    beforeEach(() => {
        historyPush = jest.fn();
        (useHistory as jest.Mock).mockReturnValue({ push: historyPush, go: jest.fn() });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should validate email correctly', () => {
        const { result } = renderHook(() => useLogin());
        expect(result.current.email).toBe('test@example.com');
    });

    it('should handle email login successfully', async () => {
        const { result } = renderHook(() => useLogin());
        (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({});

        await act(async () => {
            result.current.setEmail('test@example.com');
            result.current.setPassword('password123');
            await result.current.handleLogin();
        });

        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'test@example.com', 'password123');
        expect(historyPush).toHaveBeenCalledWith('/home');
    });

    it('should handle email login error', async () => {
        const { result } = renderHook(() => useLogin());
        const error = { code: 'auth/user-not-found' };
        (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(error);

        await act(async () => {
            result.current.setEmail('test@example.com');
            result.current.setPassword('password123');
            await result.current.handleLogin();
        });

        expect(result.current.error).toBe('No user found with this email.');
    });

    it('should handle Google login successfully', async () => {
        const { result } = renderHook(() => useLogin());
        const mockUser = { user: { uid: '123' }, credential: { idToken: 'token' } };
        (FirebaseAuthentication.getCurrentUser as jest.Mock).mockResolvedValue({ user: null });
        (FirebaseAuthentication.signInWithGoogle as jest.Mock).mockResolvedValue(mockUser);
        (signInWithCredential as jest.Mock).mockResolvedValue({});

        await act(async () => {
            await result.current.triggerSocialLogin('Google');
        });

        expect(FirebaseAuthentication.signInWithGoogle).toHaveBeenCalled();
        expect(signInWithCredential).toHaveBeenCalledWith(expect.anything(), expect.anything());
        expect(historyPush).toHaveBeenCalledWith('/home');
    });

    it('should handle Facebook login successfully', async () => {
        const { result } = renderHook(() => useLogin());
        const mockUser = { user: { uid: '123' }, credential: { accessToken: 'token' } };
        (FirebaseAuthentication.getCurrentUser as jest.Mock).mockResolvedValue({ user: null });
        (FirebaseAuthentication.signInWithFacebook as jest.Mock).mockResolvedValue(mockUser);
        (signInWithCredential as jest.Mock).mockResolvedValue({});

        await act(async () => {
            await result.current.triggerSocialLogin('Facebook');
        });

        expect(FirebaseAuthentication.signInWithFacebook).toHaveBeenCalled();
        expect(signInWithCredential).toHaveBeenCalledWith(expect.anything(), expect.anything());
        expect(historyPush).toHaveBeenCalledWith('/home');
    });

    it('should handle social login error', async () => {
        const { result } = renderHook(() => useLogin());
        const error = new Error('Authentication failed');
        (FirebaseAuthentication.getCurrentUser as jest.Mock).mockResolvedValue({ user: null });
        (FirebaseAuthentication.signInWithGoogle as jest.Mock).mockRejectedValue(error);

        await act(async () => {
            await result.current.triggerSocialLogin('Google');
        });

        expect(result.current.error).toBe('Authentication failed');
    });
});