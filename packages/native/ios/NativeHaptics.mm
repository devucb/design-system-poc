#import "NativeHaptics.h"

#import <UIKit/UIKit.h>

@implementation NativeHaptics

RCT_EXPORT_MODULE()

- (void)trigger:(NSString *)kind
{
  dispatch_async(dispatch_get_main_queue(), ^{
    if ([kind isEqualToString:@"selection"]) {
      UISelectionFeedbackGenerator *generator = [UISelectionFeedbackGenerator new];
      [generator selectionChanged];
      return;
    }

    if ([kind isEqualToString:@"impact"]) {
      UIImpactFeedbackGenerator *generator =
          [[UIImpactFeedbackGenerator alloc] initWithStyle:UIImpactFeedbackStyleMedium];
      [generator impactOccurred];
      return;
    }

    UINotificationFeedbackType type = [kind isEqualToString:@"error"]
                                          ? UINotificationFeedbackTypeError
                                          : UINotificationFeedbackTypeSuccess;
    UINotificationFeedbackGenerator *generator = [UINotificationFeedbackGenerator new];
    [generator notificationOccurred:type];
  });
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeHapticsSpecJSI>(params);
}

@end
