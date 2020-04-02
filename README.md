# Project of Data Visualization (COM-480)

| Student's name               | SCIPER |
| ---------------------------- | ------ |
| Beuchat Bastien              | 257117 |
| Jollès Eric Michel Alexandre | 269708 |
| Mamie Robin Georges Francis  | 257234 |

[Milestone 1](#milestone-1-friday-3rd-april-5pm) • [Milestone 2](#milestone-2-friday-1st-may-5pm) • [Milestone 3](#milestone-3-thursday-28th-may-5pm)

## Milestone 1 (Friday 3rd April, 5pm)

#### 10% of the final grade

### 2.1 Dataset

Our work will focus on the international ski federation (FIS, *fédération internationale de ski*) alpine skiing world cup (WC) results for both men and women, from 1966.

The data is direcly extracted from [Ski-DB](https://www.ski-db.com/).
This site provides all results of every Ski World Cup race, following very closely the data found directly on the [FIS website](https://www.fis-ski.com/DB/general/calendar-results.html?eventselection=results&sectorcode=AL&categorycode=WC).
We preferred using the former site rather than the latter for the scraping part; indeed, the first site has a simpler layout that allows for easier work on the data.
All the data is already present in our repository - for both [men](/data/wcm.csv) and [women](/data/wcf.csv).
It does not require a lot of cleaning or data wrangling, as the raw data from the website is exact and without noise or problem.

Here is an example entry in our dataset:

| season | date | venue | country | event | ath_rank | ath_name | ath_country | ath_time_run_1 | ath_time_run_2 | ath_time | ath_time_diff | ath_ski | ath_id |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2020 | 2020-01-12 | Adelboden | SUI | Slalom | 1 | Daniel Yule | SUI | 5315 | 5558 | 10873 | 0 | Fischer | daniel_yule_sui_511996 |

An entry is uniquely indexable using the gender, the date of the race, its type (Slalom, Downhill, etc.) and the name of the athlete.
If a run was cancelled for one reason or another, it is still present in the dataset but with a (unique) blank athlete name.
The times are in hundredth of seconds to keep them as integers.
Times taken for the 1st and 2nd runs (for relevant events) always equal the total time.
The id present at the end links back to the [athlete's profile](https://ski-db.com/db/profiles/daniel_yule_sui_511996.php) on Ski-DB, which provides additional information (birthdate, etc.)
This could prove useful in the future should we choose to use it.

### 2.2 Problematic

We want to explore the evolution of the alpine ski WC.
Since its opening season in 1966, a lot of evolution took place in alpine skiing.
This sport evolved with the technology improvement over the years.
It grows to have several kind of events all around the world.
With the historical dataset we want to visualize the evolution during the years.

We would like to visualize :

- The evolution of the skier profiles through the years
- Geographical representation of the World Cup races (here is what we think about: [ski map](https://com-480-project-data-viz-le-6.github.io/ski_map/))
- Animation showing the evolutive ranking through the years

### 2.3 Exploratory data analysis

We scraped the data from the women and men world cup and we get those entity :

- Number of seasons  : 54   (all seasons since the beginning of the WC)
- Number of races    : 3477
- Number of athletes : 3137
- Number of country  : 77

![race per year](./analysis/races_per_year.png)



### 2.4 Related work

There is data available for the results, rankings and athletes profiles, but all are static tables not really convenient to read and some basic static charts.
We did not find something similar to what we want to do.
We want to do much more doing dynamic visualization that allow to explore this data smoothly.

- https://www.fis-ski.com : the FIS has results, rankings and athletes records since the beginning
- https://www.ski-db.com/ : the website on which we scraped the data also show cool stats and ranking.
  For example : all time greatest ranking
- http://ski-reference.com/ : website that allow to query FIS website to compare two athletes or analyse the results of one course.

## Milestone 2 (Friday 1st May, 5pm)

#### 10% of the final grade

## Milestone 3 (Thursday 28th May, 5pm)

#### 80% of the final grade
