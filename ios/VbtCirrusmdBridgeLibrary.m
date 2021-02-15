#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(VbtCirrusmdBridgeLibrary, NSObject)

RCT_EXTERN_METHOD(
login: (NSString*)sdkId
patientIden: (NSInteger*)patientId
secret: (NSString*)token
resolver: (RCTPromiseResolveBlock)resolve
rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(loadView)

@end
