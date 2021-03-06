require 'crack/xml'
require 'active_support/core_ext/hash/slice'
require 'active_support/core_ext/date_time'
require 'active_support/core_ext/numeric/time'
require 'ap'
require 'zlib'
require 'json'
require 'time'
require 'httparty'
require 'tempfile'

LAST_DOWNLOADED_AT_FILE_NAME = 'lastDownloaded.txt'
JSON_FILE_NAME = 'public/station_data.json'
NEW_JSON_FILE_NAME = JSON_FILE_NAME + '.new'

INTEGER_STATION_ATTRIBUTES = %w(nbBikes nbDocks nbEmptyDocks)
WANTED_STATION_ATTRIBUTES = %w(id name lat long) + INTEGER_STATION_ATTRIBUTES

FEED_URL = 'https://tfl.gov.uk/tfl/syndication/feeds/cycle-hire/livecyclehireupdates.xml'

def main
  download_content_if_out_of_date do |new_content|
    parsed = Crack::XML.parse(new_content)

    slice_and_convert_required_attributes(parsed)

    # Atomically update the JSON file (rename is atomic).
    File.write(NEW_JSON_FILE_NAME, parsed.to_json)
    File.rename(NEW_JSON_FILE_NAME, JSON_FILE_NAME)

    File.write(LAST_DOWNLOADED_AT_FILE_NAME, DateTime.now)
  end
end

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

def download_content
  feed_get_response = HTTParty.get(FEED_URL)

  if feed_get_response.code == 200
    yield feed_get_response.body

    puts 'Successfully downloaded feed data!'
  else
    puts "Could not download new copy of feed data got code: #{res.code}"
  end
end

def download_content_if_out_of_date(&new_content_block)
  if download_out_of_date?
    download_content(&new_content_block)
  else
    puts 'Have already downloaded recent copy of feed data.'
  end
end

def download_out_of_date?
  last_downloaded_at = read_last_downloaded_at_file

  !last_downloaded_at || last_downloaded_at <= 30.seconds.ago
end

def read_last_downloaded_at_file
  DateTime.parse(File.read(LAST_DOWNLOADED_AT_FILE_NAME))
rescue
  nil
end

main
