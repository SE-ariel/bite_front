import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLogin } from '../logics/Login';
import { makeRecipe } from '../logics/Recipe';
import { useProfile } from '../logics/Profile';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, collection, addDoc, updateDoc, serverTimestamp, arrayUnion } from 'firebase/firestore';

// Mock Firebase Auth
vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
  getAuth: vi.fn(() => ({
    currentUser: { uid: 'testUserId' }
  }))
}));

// Mock Firebase Firestore
vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn(),
  collection: vi.fn(),
  addDoc: vi.fn(),
  updateDoc: vi.fn(),
  arrayUnion: vi.fn((id) => id),
  serverTimestamp: vi.fn(() => new Date()),
  getFirestore: vi.fn(() => ({})),
  onSnapshot: vi.fn((docRef, callback) => {
    callback({
      exists: () => true,
      data: () => ({})
    });
    return vi.fn(); // Unsubscribe function
  })
}));

// Mock Firebase Config
vi.mock('../firebaseConfig', () => ({
  auth: {
    currentUser: { uid: 'testUserId' }
  },
  db: {},
  app: {}
}));

// Mock React Router
vi.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: vi.fn(),
    go: vi.fn(),
    back: vi.fn()
  })
}));

describe('Recipe App Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Authentication
  it('should handle user login with email/password', async () => {
    // Setup
    const mockSignIn = vi.mocked(signInWithEmailAndPassword);
    mockSignIn.mockResolvedValueOnce({
      user: { email: 'test@example.com' }
    } as any);

    const { result } = renderHook(() => useLogin());

    // Execute
    await act(async () => {
      result.current.setEmail('test@example.com');
    });

    await act(async () => {
      result.current.setPassword('password123');
    });
    
    await act(async () => {
      await result.current.handleLogin();
    });

    // Assert
    expect(mockSignIn).toHaveBeenCalledWith(
      expect.anything(),
      'test@example.com',
      'password123'
    );
    expect(result.current.error).toBeNull();
  });

  // Test 2: Recipe Creation
  it('should create a new recipe successfully', async () => {
    // Setup
    const mockRecipeData = {
      title: 'Chocolate Cake',
      instructions: ['Mix ingredients', 'Bake at 350°F'],
      ingredients: ['flour', 'sugar', 'cocoa']
    };

    // Mock user document
    const mockUserDoc = {
      exists: () => true,
      data: () => ({ name: 'Test User' })
    };

    // Mock Firestore functions
    vi.mocked(doc).mockReturnValue('docRef' as any);
    vi.mocked(getDoc).mockResolvedValue(mockUserDoc as any);
    vi.mocked(collection).mockReturnValue('collectionRef' as any);
    vi.mocked(addDoc).mockResolvedValue({ id: 'newRecipeId' } as any);
    vi.mocked(updateDoc).mockResolvedValue(undefined);
    vi.mocked(arrayUnion).mockReturnValue({
      isEqual: () => true,
      _methodName: 'arrayUnion',
      _elements: ['newRecipeId']
    } as any);
    vi.mocked(serverTimestamp).mockReturnValue({
      isEqual: () => true,
      toMillis: () => new Date().getTime(),
      toDate: () => new Date()
    } as any);

    // Execute
    const recipeId = await makeRecipe(mockRecipeData);

    // Assert
    expect(recipeId).toBe('newRecipeId');
    expect(addDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        ...mockRecipeData,
        creatorId: 'testUserId'
      })
    );
    expect(updateDoc).toHaveBeenCalled();
  });

  // Test 3: User Profile
  it('should fetch and update user profile data', async () => {
    // Setup
    const mockUserData = {
      firstName: 'John',
      surName: 'Doe',
      role: 'user',
      email: 'john@example.com',
      savedRecipes: '123,456'
    };

    vi.mocked(doc).mockReturnValue('userDocRef' as any);
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => mockUserData
    } as any);

    // Execute
    const { result } = renderHook(() => useProfile('testUserId'));

    // Wait for the profile data to be fetched
    await vi.waitFor(() => {
      expect(result.current.isChecked).toBe(true);
    });

    // Assert
    expect(result.current.userData).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      role: 'user',
      email: 'john@example.com',
      savedRecipes: '123,456'
    });
    expect(doc).toHaveBeenCalledWith(expect.anything(), 'users', 'testUserId');
  });
});