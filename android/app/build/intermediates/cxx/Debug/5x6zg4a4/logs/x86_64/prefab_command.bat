@echo off
"C:\\Program Files\\Java\\jdk-21\\bin\\java" ^
  --class-path ^
  "C:\\Users\\Carla\\.gradle\\caches\\modules-2\\files-2.1\\com.google.prefab\\cli\\2.1.0\\aa32fec809c44fa531f01dcfb739b5b3304d3050\\cli-2.1.0-all.jar" ^
  com.google.prefab.cli.AppKt ^
  --build-system ^
  cmake ^
  --platform ^
  android ^
  --abi ^
  x86_64 ^
  --os-version ^
  24 ^
  --stl ^
  c++_shared ^
  --ndk-version ^
  26 ^
  --output ^
  "C:\\Users\\Carla\\AppData\\Local\\Temp\\agp-prefab-staging5712210043016411301\\staged-cli-output" ^
  "C:\\Users\\Carla\\.gradle\\caches\\8.10.2\\transforms\\380020bc4ae98bb0118161d36add3474\\transformed\\react-android-0.76.9-debug\\prefab" ^
  "C:\\Users\\Carla\\202\\progra_movil\\nuevo-proyecto\\android\\app\\build\\intermediates\\cxx\\refs\\react-native-reanimated\\3bi4n2x3" ^
  "C:\\Users\\Carla\\.gradle\\caches\\8.10.2\\transforms\\cbae6fd05b14449c109a4741a988337b\\transformed\\hermes-android-0.76.9-debug\\prefab" ^
  "C:\\Users\\Carla\\.gradle\\caches\\8.10.2\\transforms\\ab403838776104c8b5f93471d162cb09\\transformed\\fbjni-0.6.0\\prefab"
