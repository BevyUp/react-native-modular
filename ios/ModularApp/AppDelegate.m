/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  /* We need to keep track of these because we may want to reinit the bridge later and
   * will need them then.
   */
  self.launchOptions = launchOptions;

  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  // Dynamic Bundle
  [RNDynamicBundle setDefaultBundleURL:jsCodeLocation];
  RCTRootView *rootView = [self getRootViewForBundleURL:[RNDynamicBundle resolveBundleURL]];

  // Default Bundle
  /*RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"ModularApp"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [UIColor blackColor];*/

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

/**
 * Native changes required to support dynamic bundles
 */
- (void)dynamicBundle:(RNDynamicBundle *)dynamicBundle requestsReloadForBundleURL:(NSURL *)bundleURL
{
  self.window.rootViewController.view = [self getRootViewForBundleURL:bundleURL];
}

- (RCTRootView *)getRootViewForBundleURL:(NSURL *)bundleURL
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithBundleURL:bundleURL
                                            moduleProvider:nil
                                             launchOptions:self.launchOptions];
  RNDynamicBundle *dynamicBundle = [bridge moduleForClass:[RNDynamicBundle class]];
  dynamicBundle.delegate = self;
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"ModularApp"
                                            initialProperties:nil];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  return rootView;
}

@end
