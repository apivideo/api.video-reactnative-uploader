#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_REMAP_MODULE(ApiVideoUploader, RCTUploader, NSObject)

RCT_EXTERN_METHOD(setEnvironment:(NSString)environment)

RCT_EXTERN_METHOD(setApiKey:(NSString)apiKey)

RCT_EXTERN_METHOD(setChunkSize:(nonnull NSNumber)size
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(uploadWithUploadToken:(NSString)token:(NSString)filePath
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(upload:(NSString)videoId:(NSString)filePath
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

@end
