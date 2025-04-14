
# Document Reader

  

Document Reader is a mobile application built with React Native and Expo that allows users to read and listen to text documents. It features text-to-speech capabilities with customizable reading settings.

  

## Features

  

- 📱 Mobile-friendly document reading interface

- 🔊 Text-to-speech functionality

- 📄 Support for multiple file formats:

	Plain text (.txt)

	Microsoft Word (.doc, .docx)

	PDF (.pdf) [Upcoming version]

- ⚙️ Customizable reading settings:

	Reading speed control

	Voice pitch adjustment

	Multiple language support

- 📖 Reading navigation controls:

	Page navigation

	Paragraph navigation

	Sentence navigation

- 🎯 Additional features:

	Progress tracking

	Swipe gestures for navigation

	Page slider for quick jumps

	Play/Pause controls

  

## Installation

  

1. Clone the repository:

  

```bash

git  clone  https://github.com/Rajat1517/documentReader.git

cd  document-reader

```

  

2. Install dependencies:

  

```bash

npm  install

```

  

3. Start the development server:

  

```bash

npm  start

```

  

## Building the APK

  

To build the Android APK:

  

1. Login to Expo:

  

```bash

expo  login

```

  

2. Build the app:

  

```bash

eas  build  --platform  android  --profile  production

```

  

3. Download the AAB file from the Expo dashboard

  

4. Convert AAB to APK:

  

```bash

java  -jar  bundletool-all-1.16.0.jar  build-apks  --bundle=/path/to/aab  --output=/path/to/apk  --mode=universal  --ks=your-keystore.jks  --ks-key-alias=your-key-alias  --ks-pass=pass:<password>  --key-pass=pass:<password>

```

  

## Usage

  

1. Launch the app

2. Choose from these options:

  

- Try the demo with "Dummy" text

- Upload your own document

  

3. In the reader view:

- Swipe left/right to change pages

- Use the control panel for navigation:

- Fast backward/forward for paragraphs

- Step backward/forward for sentences

- Play/Pause for text-to-speech

- Access settings to customize:

- Reading language

- Speech speed

- Voice pitch

  

## Tech Stack

  

- React Native

- Expo

- React Navigation

- Expo Speech

- Expo Document Picker

- Mammoth (for Word document processing)

  

## Dependencies

  

- "@react-native-community/slider": "^4.5.3"

- "@react-navigation/native-stack": "^6.11.0"

- "expo": "~51.0.28"

- "expo-document-picker": "^12.0.2"

- "expo-file-system": "^17.0.1"

- "expo-speech": "^12.0.2"

- "mammoth": "^1.8.0"

- "react-native-dropdown-picker": "^5.4.6"

  

## License

  

MIT License

  

Copyright (c) 2025 Rajat Mishra

  

Permission is hereby granted, free of charge, to any person obtaining a copy

of this software and associated documentation files (the "Software"), to deal

in the Software without restriction, including without limitation the rights

to use, copy, modify, merge, publish, distribute, sublicense, and/or sell

copies of the Software, and to permit persons to whom the Software is

furnished to do so, subject to the following conditions:

  

The above copyright notice and this permission notice shall be included in all

copies or substantial portions of the Software.

  

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR

IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,

FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE

AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER

LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,

OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE

SOFTWARE.