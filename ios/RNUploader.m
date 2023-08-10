#import <React/RCTBridgeModule.h>

/* Argument types cheatsheet
 * | Objective C                                   | JavaScript         |
 * |-----------------------------------------------|--------------------|
 * | NSString                                      | string, ?string    |
 * | BOOL                                          | boolean            |
 * | NSNumber                                      | ?boolean           |
 * | double                                        | number             |
 * | NSNumber                                      | ?number            |
 * | NSArray                                       | Array, ?Array      |
 * | NSDictionary                                  | Object, ?Object    |
 * | RCTResponseSenderBlock                        | Function (success) |
 * | RCTResponseSenderBlock, RCTResponseErrorBlock | Function (failure) |
 * | RCTPromiseResolveBlock, RCTPromiseRejectBlock | Promise            |
 */

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNApiVideoUploaderSpec.h"
@interface RCT_EXTERN_REMAP_MODULE(ApiVideoUploader, RNUploader, NSObject<NativeApiVideoUploaderSpec>)
#else
@interface RCT_EXTERN_REMAP_MODULE(ApiVideoUploader, RNUploader, NSObject<RCTBridgeModule>)
#endif

RCT_EXTERN_METHOD(setEnvironment:(NSString)environment)

RCT_EXTERN_METHOD(setApiKey:(NSString)apiKey)

RCT_EXTERN_METHOD(setApplicationName:(NSString)name:(NSString)version)

RCT_EXTERN_METHOD(setChunkSize:(nonnull NSNumber)size
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setTimeout:(NSNumber)timeout)

RCT_EXTERN_METHOD(uploadWithUploadToken:(NSString)token:(NSString)filePath
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(upload:(NSString)videoId:(NSString)filePath
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
    return std::make_shared<facebook::react::NativeCitizenEscposprinterSpecJSI>(params);
}
#endif

@end
