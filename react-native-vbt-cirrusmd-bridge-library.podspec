require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-vbt-cirrusmd-bridge-library"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "12.0" }
  s.source       = { :git => "https://github.com/tlevacic/react-native-vbt-cirrusmd-bridge-library.git", :tag => "#{s.version}" }

  
  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.static_framework = true

  s.dependency "React-Core"
  s.dependency "CirrusMDSDK", "~> 6.2.0"
  s.dependency 'AwaitKit', '~> 5.2.0'
  s.dependency 'PromiseKit', '~> 6.13.1'
end
