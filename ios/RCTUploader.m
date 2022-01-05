#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_REMAP_MODULE(ApiVideoUploader, RCTUploader, NSObject)

RCT_EXTERN_METHOD(uploadWithUploadToken:(NSString)token :(NSString)filePath
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

@end
