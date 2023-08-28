import ApiVideoUploader

@objc(RNUploader)
class RNUploader: NSObject {
    let uploadModule = UploaderModule()

    override init() {
        do {
            try uploadModule.setSdkName(name: "reactnative-uploader", version: "1.1.0")
        } catch {
            fatalError("Failed to set SDK name: \(error)")
        }
    }

    @objc static func requiresMainQueueSetup() -> Bool {
        return false
    }

    @objc(setEnvironment:)
    func setEnvironment(environment: String) {
        uploadModule.environment = environment
    }

    @objc(setApiKey:)
    func setApiKey(apiKey: String) {
        uploadModule.apiKey = apiKey
    }

    @objc(setApplicationName::)
    func setApplicationName(name: String, version: String) {
        do {
            try uploadModule.setApplicationName(name: name, version: version)
        } catch {
            fatalError("Failed to set Application name: \(error)")
        }
    }

    @objc(setChunkSize:withResolver:withRejecter:)
    func setChunkSize(size: NSNumber, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        do {
            try uploadModule.setChunkSize(size.intValue)
            resolve(uploadModule.chunkSize)
        } catch {
            reject("failed_to_set_chunk_size", "Failed to set chunk size", error)
        }
    }

    @objc(setTimeout:)
    func setTimeout(timeout: NSNumber) {
        uploadModule.timeout = timeout.doubleValue
    }

    @objc(uploadWithUploadToken:::withResolver:withRejecter:)
    func uploadWithUploadToken(token: String, filePath: String, videoId: String?, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        do {
            try uploadModule.uploadWithUploadToken(token: token, filePath: filePath, videoId: videoId, onProgress: { _ in }, onSuccess: { video in
                resolve(video)
            }, onError: { error in
                reject("upload_with_upload_token_failed", error.localizedDescription, error)
            })
        } catch {
            reject("upload_with_upload_token_failed", error.localizedDescription, error)
        }
    }

    @objc(upload::withResolver:withRejecter:)
    func upload(videoId: String, filePath: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        do {
            try uploadModule.upload(videoId: videoId, filePath: filePath, onProgress: { _ in }, onSuccess: { video in
                resolve(video)
            }, onError: { error in
                reject("upload_failed", error.localizedDescription, error)
            })
        } catch {
            reject("upload_failed", error.localizedDescription, error)
        }
    }
}
