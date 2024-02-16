extension String {
    func deletePrefix(_ prefix: String) -> String {
        guard self.hasPrefix(prefix) else { return self }
        return String(self.dropFirst(prefix.count))
    }
    
    var url: URL {
        return URL(fileURLWithPath: self.deletePrefix("file://"))
    }
}
