require './app'

use Rack::Deflater

use Rack::Static, :urls => ['/style', '/scripts', '/icons', '/station_data.json'], root: 'public'

run Sinatra::Application
