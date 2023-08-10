import ApiVideoUploader

@objc(RNUploader)
class RNUploader: NSObject {
    
    override init() {
        try? ApiVideoUploader.setSdkName(name: "reactnative-uploader", version: "1.1.0")
    }
    
    @objc(setEnvironment:)
    func setEnvironment(environment: String) -> Void {
        ApiVideoUploader.basePath = environment
    }
    
    @objc(setApiKey:)
    func setApiKey(apiKey: String) -> Void {
        ApiVideoUploader.apiKey = apiKey
    }
 
    @objc(setApplicationName::)
    func setApplicationName(name: String, version: String) -> Void {
        try! ApiVideoUploader.setApplicationName(name: name, version: version)
    }
    
    @objc(setChunkSize:withResolver:withRejecter:)
    func setChunkSize(size: NSNumber, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        do {
            try ApiVideoUploader.setChunkSize(chunkSize: Int(truncating: size))
            resolve(ApiVideoUploader.getChunkSize())
        } catch {
            reject("failed_to_set_chunk_size", "Failed to set chunk size", error)
        }
    }

    @objc(setTimeout:)
    func setTimeout(timeout: NSNumber) -> Void {
        ApiVideoUploader.timeout = timeout.doubleValue
        print(ApiVideoUploader.timeout)
    }
    
    @objc(uploadWithUploadToken::withResolver:withRejecter:)
    func uploadWithUploadToken(token: String, filePath: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        do {
            let url = URL(string: filePath)!
            try VideosAPI.uploadWithUploadToken(token: token, file: url, onProgressReady: nil) { (video, error) in
                if let error = error {
                    if case let ErrorResponse.error(code, data, _, _) = error {
                        var message: String? = nil
                        if let data = data {
                            message = String(decoding: data, as: UTF8.self)
                        }
                        reject(String(code), message, error)
                    } else {
                        reject("upload_with_upload_token_failed", "Upload with upload token failed", error)
                    }
                }
                if let video = video {
                    let encodeResult = CodableHelper.encode(video)
                    do {
                        let json = try encodeResult.get()
                        resolve(String(decoding: json, as: UTF8.self))
                    } catch {
                        reject("serialization_failed", "Failed to serialize JSON", error)
                    }
                }
            }
        } catch {
            reject("upload_failed", "Failed to initiate upload", error)
        }
    }
    
    @objc(upload::withResolver:withRejecter:)
    func upload(videoId: String, filePath: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        do {
            let url = URL(string: filePath)!
            try VideosAPI.upload(videoId: videoId, file: url, onProgressReady: nil) { (video, error) in
                if let error = error {
                    if case let ErrorResponse.error(code, data, _, _) = error {
                        var message: String? = nil
                        if let data = data {
                            message = String(decoding: data, as: UTF8.self)
                        }
                        reject(String(code), message, error)
                    } else {
                        reject("upload_failed", "Upload failed", error)
                    }
                }
                if let video = video {
                    let encodeResult = CodableHelper.encode(video)
                    do {
                        let json = try encodeResult.get()
                        resolve(String(decoding: json, as: UTF8.self))
                    } catch {
                        reject("serialization_failed", "Failed to serialize JSON", error)
                    }
                }
            }
        } catch {
            reject("upload_failed", "Failed to initiate upload", error)
        }
    }

    @objc static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
