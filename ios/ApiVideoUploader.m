#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ApiVideoUploader, NSObject)

RCT_EXTERN_METHOD(upload:(NSString)token :(NSString)filename :(NSString)filepath
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

@end
