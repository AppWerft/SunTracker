/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"GmuKYsZRXi4hh1TfuXPmrl5AaExdMxGq"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"70zimo1RrTBggb8ky3BtI0C7W04mXxUa"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"54OXT6YejsdfAVqTJ0bKE6I0JwEZCgAC"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"cM8Qje4p2WOcP1JuqiycdLcYyDZn8J3x"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"BdFcjLULsloPydDkRuChUN7kIfcLraO1"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"2jnsHDRxWj5crokhDR1uSNSj2YEzNXFR"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
