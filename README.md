# How to build signed apk
    - Generate keystore file using keytool.(In Windows file path: C:\Program Files\Java\jdkx.x.x_x\bin, In Mac file path: use this command then you can find it - /usr/libexec/java_home)

    - Set up gradle variables
        1. Place your keystore file under the android/app directory in your project folder.
        2. Edit the file ~/.gradle/gradle.properties or android/gradle.properties, and add the following (replace ***** with the correct keystore password, alias and key password)

            MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
            MYAPP_RELEASE_KEY_ALIAS=my-key-alias
            MYAPP_RELEASE_STORE_PASSWORD=*****
            MYAPP_RELEASE_KEY_PASSWORD=*****

    - Add gradle config
        Edit the file android/app/build.gradle in your project folder, and add the signing config
        http://prntscr.com/mjgrkx
    
    - Generate signed apk
        Simply run the following in a terminal:
            $ cd android
            $ ./gradlew assembleRelease

# Fix the issues when build
    1. Error: Duplicate resources
        In this solution you no need to delete any drawable folder. Just add the following code in the react.gradle file which you could find under node_modules/react-native/react.gradle path
            doLast {
                def moveFunc = { resSuffix ->
                    File originalDir = file("$buildDir/generated/res/react/release/drawable-${resSuffix}");
                    if (originalDir.exists()) {
                        File destDir = file("$buildDir/../src/main/res/drawable-${resSuffix}");
                        ant.move(file: originalDir, tofile: destDir);
                    }
                }
                moveFunc.curry("ldpi").call()
                moveFunc.curry("mdpi").call()
                moveFunc.curry("hdpi").call()
                moveFunc.curry("xhdpi").call()
                moveFunc.curry("xxhdpi").call()
                moveFunc.curry("xxxhdpi").call()
            }

    2. AAPT: error: resource android:attr/colorError not found.
        Add follow code section under the android/build.gradle in your project folder
            subprojects {
                afterEvaluate {
                    project ->
                        if (project.hasProperty("android")) {
                            android {
                                compileSdkVersion = 27
                                buildToolsVersion = "27.0.3"
                            }
                        }
                }
            }

# Google sign in
Must be add fingerprint of the debug and release keystore both(sha1 key)

    signingConfigs {
        debug {
            storeFile file(MYAPP_DEBUG_STORE_FILE)
            storePassword MYAPP_DEBUG_STORE_PASSWORD
            keyAlias MYAPP_DEBUG_KEY_ALIAS
            keyPassword MYAPP_DEBUG_KEY_PASSWORD
        }
    }

# Facebook sigin in
Must be add hash key in the facebook app
cli - keytool -exportcert -alias androiddebugkey -keystore "C:\Users\USERNAME\.android\debug.keystore" | "PATH_TO_OPENSSL_LIBRARY\bin\openssl" sha1 -binary | "PATH_TO_OPENSSL_LIBRARY\bin\openssl" base64
      
For it's working after adding this line in app/build.gradle

implementation "com.android.support:support-v4:27.1.1""# geselle_react_native" 
