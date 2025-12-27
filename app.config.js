module.exports = () => {
  const buildArchs =
    process.env.BUILD_PROFILE === 'development'
      ? ['arm64-v8a', 'x86_64']
      : ['arm64-v8a']

  return {
    expo: {
      name: 'Lumen',
      slug: 'lumen-app',
      scheme: 'com.malberee.lumen',
      version: '1.0.0',
      orientation: 'portrait',
      icon: './assets/adaptive-icon.png',
      userInterfaceStyle: 'light',
      newArchEnabled: true,
      android: {
        edgeToEdgeEnabled: true,
        adaptiveIcon: {
          foregroundImage: './assets/adaptive-icon.png',
          backgroundColor: '#09090B',
        },
        permissions: ['android.permission.ACCESS_FINE_LOCATION'],
        package: 'com.malberee.lumen',
      },
      androidStatusBar: { translucent: true },
      androidNavigationBar: { backgroundColor: '#00000000' },
      web: {
        bundler: 'metro',
        favicon: './assets/favicon.png',
      },
      plugins: [
        [
          'expo-router',
          {
            root: './src/app/routes',
          },
        ],
        [
          'expo-splash-screen',
          {
            backgroundColor: '#09090B',
            image: './assets/splash-icon-light.png',
            imageWidth: 200,
          },
        ],
        [
          'expo-build-properties',
          {
            android: {
              enableBundleCompression: true,
              enableMinifyInReleaseBuilds: true,
              buildArchs,
            },
          },
        ],
      ],
      extra: {
        eas: {
          projectId: 'b849292a-2223-4f58-aaf0-64e031539ff2',
        },
      },
    },
  }
}
