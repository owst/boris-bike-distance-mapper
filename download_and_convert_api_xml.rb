require 'crack/xml'
require 'active_support/core_ext/hash/slice'
require 'active_support/core_ext/date_time'
require 'active_support/core_ext/numeric/time'
require 'ap'
require 'zlib'
require 'json'
require 'time'
require 'httparty'

LAST_DOWNLOADED_AT_FILE_NAME = 'lastDownloaded.txt'
JSON_FILE_NAME = 'public/station_data.json'

INTEGER_STATION_ATTRIBUTES = %w(nbBikes nbDocks nbEmptyDocks)
WANTED_STATION_ATTRIBUTES = %w(id name lat long) + INTEGER_STATION_ATTRIBUTES

FEED_URL = 'https://tfl.gov.uk/tfl/syndication/feeds/cycle-hire/livecyclehireupdates.xml'

def slice_and_convert_required_attributes(parsed_stations_data)
  parsed_stations_data['stations'].tap do |stations|
    stations['station'].each do |station|
      station.slice!(*WANTED_STATION_ATTRIBUTES)

      INTEGER_STATION_ATTRIBUTES.each do |integer_attribute|
        station[integer_attribute] = station[integer_attribute].to_i
      end
    end
  end
end

def download_newer_version
  last_downloaded_at = DateTime.parse(File.read(LAST_DOWNLOADED_AT_FILE_NAME)) rescue nil

  if !last_downloaded_at || last_downloaded_at <= 30.seconds.ago
    res = HTTParty.get(FEED_URL)

    if res.code == 200
      yield res.body

      puts 'Successfully downloaded feed data!'
    else
      puts "Did not download new copy of feed data: #{res.code}"
    end
  else
    puts 'Have already downloaded recent copy of feed data.'
  end

end

download_newer_version do |new_content|
  parsed = Crack::XML.parse(new_content)

  slice_and_convert_required_attributes(parsed)

  File.write(JSON_FILE_NAME, parsed.to_json)

  File.write(LAST_DOWNLOADED_AT_FILE_NAME, DateTime.now)
end
