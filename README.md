### Demonstration Video: https://youtu.be/Ls5qb0XSN9Y?t=180
**3 minutes of demonstration from 3:00 to 6:00 in the video (30 second summary from 5:30 to 6:00).**
#
# Noise Pollution Tracker

### HackLah! Hackathon

### June 3rd - June 5th, 2023

**Team Members:** Carter Morris, Joshua Bastien, Banghao Wang

## Inspiration
We are a team of three students from the University of Toronto, and the inspiration for NoiseTracker was born out of a very personal understanding of the impacts of noise pollution. 
Personally knowing noise-sensitive individuals to noise led us to comprehend the severity of noise pollution not only as an inconvenience, but as a significant
public mental health concern. This insight spurred us into exploring how technology could be employed to raise awareness and mitigate this often-overlooked problem. We noticed that there
were few resources currently available that allow for objective measurement and documentation of noise, limiting the potential for effective change. To fill this gap, we embarked on creating
NoiseTracker, a tool designed to empower individuals and communities with data to understand and combat noise pollution.

## What it Does
NoiseTracker is a noise pollution monitoring platform that offers a user-friendly method for recording, analyzing, and visualizing noise levels in one's local vicinity.

Here's how NoiseTracker operates, from start to finish:

1. **Detect Noise:** The user clicks the 'Start Recording' button, allowing NoiseTracker to record ambient noise in their vicinity for a few seconds.
2. **Analyze Volume:** The platform, in real-time, analyzes the volume of the detected noise and displays both the current and peak volume levels.
3. **Playback the Noise:** For a more detailed review, users can replay the recorded noise by clicking the 'Play' button.
4. **Plot the Noise on a Map:** To visualize noise pollution in their area, users can enter a location and click 'Submit Location'. This allows them to view the noise pollution data on a map and place a dynamic marker indicating the peak noise level at that time and date.

Additionally, NoiseTracker includes a community page where users can raise awareness of specific noise pollution issues. This function nurtures a community-driven approach to addressing noise pollution.

## How We Built It
NoiseTracker was developed entirely from scratch within a 24-hour period, with no previously written code being reused. We utilized a combination of web development technologies for noise
detection, analysis and geospatial visualization.

The front end of the website was crafted using HTML, CSS, and JavaScript, creating a user-friendly interface that's easy to navigate. Node.js and Express.js were employed for the backend,
providing a robust and scalable framework for handling our API endpoints. These endpoints are responsible for the recording, analyzing, and location-based services provided by NoiseTracker.

We used the Web Audio API to capture audio input from the user's microphone. This data is then analyzed using a machine learning model, specifically trained to detect and quantify noise levels.

A significant part of our project revolves around the Google Maps API. This integration enables users to plot their recorded noise levels on a map, facilitating a visual representation of noise pollution in their vicinity.

## Challenges We Ran Into
Creating NoiseTracker in a single day posed unique challenges, with the most notable hurdle being the integration of the Google Maps API. Our goal was to enrich the maps with custom markers showcasing
information and animations indicative of noise pollution levels. Navigating the complexities of this API, while also handling the sensitive nature of user location data, was a significant task, especially
within the constraints of our one-day development period.

## Accomplishments that We're Proud Of
Built from scratch in less than 24 hours, NoiseTracker is an accomplishment we're immensely proud of. It stands as a practical tool that raises awareness about noise pollution's impact on health and well-being,
empowering individuals and communities to proactively tackle this issue. A highlight of our achievement is the successful implementation of the Google Maps API, enabling users to plot customized, informative
markers—a feature that demands significant effort but greatly enhances the user experience. All in all, NoiseTracker's real-time noise monitoring and recording capabilities, complemented by a community-oriented approach,
represent a considerable step towards fostering quieter, healthier communities.

## Next Steps for NoiseTracker
Despite building a significant part of our vision within the hackathon's time frame, there's room for expansion post-event. As zealous innovators, new ideas emerged throughout the design and implementation
phases. While we implemented some alongside our original objectives, time constraints left several exciting features yet to be explored.

Moving forward, our next steps involve technical upgrades and securing potential partnerships to enhance NoiseTracker's functionality and exposure around the community. One such idea we had for a significant
extension of our project would be to implement the usage of databases to store relative location data for our Google Maps markers data. This would not only ensure better performance and reliability but also
enable more advanced features in the future such as the ability to store seasonal data. In addition, we envision collaborating with local universities and community centers. By sharing the data captured through
NoiseTracker, we aim to provide insightful information that can help shape policy decisions and drive proactive measures against noise pollution.
