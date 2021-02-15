import Foundation
import CirrusMDSDK
import PromiseKit
import UIKit

@objc(VbtCirrusmdBridgeLibrary)
class VbtCirrusmdBridgeLibrary: NSObject {
    
    @objc
    func loadView() {
        DispatchQueue.main.async {
            let vc = CirrusMDSDK.singleton.viewController
            UIApplication.shared.windows.first?.rootViewController = UINavigationController(rootViewController: vc)
            UIApplication.shared.windows.first?.makeKeyAndVisible()
        }
      }
        
  var secret: String?;
  
  var sdkId: String?;
  
  enum LoginResponseEnum {
      case UNKNOWN
      case SUCCESS
      case INVALIDTOKEN
      case NOSECRETPROVIDED
      case SERVICEUNAVAILABLE
  }
  
  //function to export
  @objc
  func login(_ sdkId: String,patientIden patientId: Int, secret token: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject:@escaping RCTPromiseRejectBlock) -> Void
    {
      self.secret = token
      self.sdkId = sdkId
      
      loadTokenForPatient(patientId: patientId)
        .done { res in
          self.setToken(token: res)
            .done{ status in
              switch status {
              case LoginResponseEnum.SUCCESS:
                  resolve("SUCCESS")
              case LoginResponseEnum.UNKNOWN:
                reject("error-code", "Error", NSError(domain: "UNKNOWN", code: 100))
              case LoginResponseEnum.INVALIDTOKEN:
                reject("error-code", "Error", NSError(domain: "INVALID TOKEN", code: 100))
              case LoginResponseEnum.NOSECRETPROVIDED:
                reject("error-code", "Error", NSError(domain: "NO SECRET PROVIDED", code: 100))
              case LoginResponseEnum.SERVICEUNAVAILABLE:
                reject("error-code", "Error", NSError(domain: "SERVICE UNAVAILABLE", code: 100))
              }
            }
            .catch{error in
              reject("error-code", "Error", error)}
        }
        .catch{error in
          reject("error-code", "Error", error)}
    }
    
  //accepts id of patient, make api login request and return token
  func loadTokenForPatient(patientId: Int) -> Promise<String>{
    
    //for storing token that login req returns;
    var token: String? = ""
    
    //make login request and return token
    return Promise<String> { seal in
      //CirrusSDK requirement
      CirrusMDSDK.singleton.setSecret(secret!)
      
      //URL definition
      guard let url = URL(string: "https://cmd-demo1-app.cirrusmd.com/sdk/v2/sandbox/sessions")
      //if there was some error with URL return error
      else { seal.reject(NSError(domain: "Some error", code: 100)); return }
      
      //object that will be sent as body in login request
      let postDict = ["patient_id": patientId, "sdk_id": sdkId] as [String : Any]
      
      //parse above object in json
      guard let postData = try? JSONSerialization.data(withJSONObject: postDict, options: [])
      //handle possible json error
      else { seal.reject(NSError(domain: "Some error 2", code: 102)) ; return }
      
      //defining HTTP request
      var request = URLRequest(url: url)
      request.httpMethod = "POST"
      request.setValue("application/json", forHTTPHeaderField: "Content-Type")
      request.setValue("application/json", forHTTPHeaderField: "Accept")
      request.httpBody = postData
      
      //login request
      let session = URLSession(configuration: URLSessionConfiguration.default)
      //response
      session.dataTask(with: request) {(data, response, error) in
          guard let data = data else { return }
          
       //parse JSON in Swift map
          guard let responseObject = try? JSONSerialization.jsonObject(with: data, options: []) else { return }
          //handle token errors
          guard let responseDict = responseObject as? [String: Any] else { return }
          guard let serverToken = responseDict["token"] as? String else { return }
          token = serverToken
        print("TOKEN JE " + token!)
        print("FIRST PRINT")
        //fulfill promise, mark it as resolved and return token from login request
        seal.fulfill(token!)
      }.resume()
    }
  }
  
  func setToken(token: String) -> Promise<LoginResponseEnum> {
      /*
       Loads an SSO user from the provided token.`CirrusMDSDK.singleton.setSecret`
       must be called prior to calling `CirrusMDSDK.singleton.setToken`
       */
    return Promise<LoginResponseEnum> { seal in
    
      CirrusMDSDK.singleton.setToken(token) {(result) in
          switch result {
          case .success:
              NSLog("Set Token Success")
              seal.fulfill(LoginResponseEnum.SUCCESS)
          case .invalidToken:
              NSLog("Set Token Invalid Token Error")
            seal.fulfill(LoginResponseEnum.INVALIDTOKEN)
          case .noSecretProvided:
              NSLog("Set Token No Secret Provided")
            seal.fulfill(LoginResponseEnum.NOSECRETPROVIDED)
          case .serviceUnavailable:
              NSLog("Set Token Service Unavailable")
            seal.fulfill(LoginResponseEnum.SERVICEUNAVAILABLE)
          }
      }
  }
}
}

