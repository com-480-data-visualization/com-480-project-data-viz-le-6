# Project of Data Visualization (COM-480)

| Student's name               | SCIPER |
| ---------------------------- | ------ |
| Beuchat Bastien              | 257117 |
| Jollès Eric Michel Alexandre | 269708 |
| Mamie Robin Georges Francis  | 257234 |

[Milestone 1](#milestone-1-friday-3rd-april-5pm) • [Milestone 2](#milestone-2-friday-1st-may-5pm) • [Milestone 3](#milestone-3-thursday-28th-may-5pm)

## Milestone 1 (Friday 3rd April, 5pm)

- **10% of the final grade**

[Milestone 1 report](doc/milestone1.md)

## Milestone 2 (Friday 1st May, 5pm)

- **10% of the final grade**

[Milestone 2 report](/doc/milestone2.pdf)

## Milestone 3 (Thursday 28th May, 5pm)

- **80% of the final grade**

[Process book](/doc/process_book.pdf)

[Screencast](/doc/screencast.mp4) ([YouTube link](https://youtu.be/lzl6EIbHbIo))

### Installation

Our website is available under [this link](https://com-480-project-data-viz-le-6.github.io/).

If you would rather run our website locally (present under the `web` folder), you can enable a webserver using e.g. the following command:

    python -m http.server <port number> --bind 127.0.0.1

### Repository structure

- `data`: contains our main datasets
- `doc`: contains our reports and other deliverables (screencast)
- `preprocessing`: contains all our Python notebooks, used to preprocess all of our data
- `web`: contains the main code of our website

### Usage

This text is also present on our webpage and explains how to use our website.

#### Tout Schuss - explore the history of World Cup results

Dear alpine skiing fans, have you ever wondered who performed best in the World Cup during their times, and how they compare to today's top athletes? Whether athletes are more or less versatile than before? Or are you just looking for an easy way to review the complete history of the World Cup? Well, wonder no more, as we will accompany you and show you the features we have brought to shed some light on these questions!

These visualizations allow you to bring your own conclusions about the evolution of the sport and its athletes. A wide variety of chopice awaits you, and here is a short presentation of everything that is available.

##### Parameters

Before diving into all the different components, take some time to set your parameters. Choose your year using the slider at the bottom and whether you would like to look at the women's or men's results, and you are then good to go!

##### Dynamic rankings

The top-left component allows you the relive the World Cup ranking evolution as they happened at the time! Who was a main contender? Why did this slalom specialist suddenly participate in downhill events? This visualization tells you everything you need and want to know. Skiers have also the color of their favorite type of event, computed for each season. Instead of letting the animation play out for you, you can simply control it using the slider in the control box.

##### Event map & race results<

The map shows all events of a given season. It evolves according to the progression of the season in the bar chart race. When you click on a given event, you can choose which race results you want to display in the top-right panel.

##### Similarity graph

The graph (bottom-middle component) shows how skiers are *linked* between each other during a given season. You can generally notice a group of technicians and another one of speed specialists. Every skier in-between is versatile and competes in all types of events.

##### Skier profile

Finally, the bottom-right component links everything together. It displays the information we have about a specific athlete, and shows graphs about the mean number of points he gathers per event, and all his World Cup points during his whole career. Each component is linked to the profile, so you can always know more about this one skier who almost won the Wolrd Cup. There is also a search bar with autocomplete available!
