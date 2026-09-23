require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = 'DSNative'
  s.version      = package['version']
  s.summary      = 'Design-system native modules'
  s.homepage     = 'https://github.com'
  s.license      = 'MIT'
  s.authors      = 'ds'
  s.platforms    = { :ios => '15.1' }
  s.source       = { :git => 'https://github.com', :tag => s.version.to_s }
  s.source_files = 'ios/**/*.{h,m,mm}'

  if respond_to?(:install_modules_dependencies, true)
    install_modules_dependencies(s)
  else
    s.dependency 'React-Core'
  end
end
