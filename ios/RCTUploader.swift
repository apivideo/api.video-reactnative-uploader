import ApiVideoUploader

@objc(RCTUploader)
class RCTUploader: NSObject {
    
    @objc(uploadWithUploadToken::withResolver:withRejecter:)
    func uploadWithUploadToken(token: String, filePath: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        let url = URL(string: filePath)!
        VideosAPI.uploadWithUploadToken(token: token, file: url, onProgressReady: nil) { (video, error) in
            if let error = error {
                if case let ErrorResponse.error(code, data, _, _) = error {
                    var message: String? = nil
                    if let data = data {
                        message = String(decoding: data, as: UTF8.self)
                    }
                    reject(String(code), message, error)
                } else {
                    reject("", "", error)
                }
            }
            if let video = video {
                let encodeResult = CodableHelper.encode(video)
                do {
                    let json = try encodeResult.get()
                    resolve(String(decoding: json, as: UTF8.self))
                } catch {
                    reject("IO", "Failed to serialize JSON", error)
                }
            }
        }
    }
    
}
