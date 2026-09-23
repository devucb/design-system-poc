#import "NativeAppEnv.h"

@implementation NativeAppEnv

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

- (NSString *)getAppEnv
{
  // Set per Xcode configuration as `APP_ENV`, surfaced through Info.plist.
  NSString *value = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"APP_ENV"];
  if ([value isKindOfClass:[NSString class]] && value.length > 0) {
    return value;
  }
  return @"prod";
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeAppEnvSpecJSI>(params);
}

@end
