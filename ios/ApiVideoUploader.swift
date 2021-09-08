import VideoUploaderIos

@objc(ApiVideoUploader)
class ApiVideoUploader: NSObject {
    
    @objc(upload:::withResolver:withRejecter:)
    func upload(token: String, filename: String, filepath: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        
        let uploader = VideoUploader()
        let parsed = filepath.replacingOccurrences(of: "file://", with: "")
        let url = URL(fileURLWithPath: parsed)
        var jsonString = ""
        var jsonVideo: Dictionary<String, AnyObject>?
        uploader.uploadWithDelegatedToken(delegatedToken: token, fileName: filename, filePath: filepath, url: url){ (json, error) in
            if(error == nil){
                jsonVideo = json
                if let jsonData = try? JSONSerialization.data(
                    withJSONObject: json as Any,
                    options: []) {
                    jsonString = String(data: jsonData,
                                        encoding: .ascii)!
                }
            }else{
                jsonString = error.debugDescription
            }
        }
        resolve(jsonString)
    }

}
