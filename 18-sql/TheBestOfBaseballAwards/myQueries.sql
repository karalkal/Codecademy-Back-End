-- halloffame people
SELECT halloffame.yearid as "Year", people.namefirst as "First Name", people.namelast as "Last Name", halloffame.playerid
FROM halloffame
JOIN people 
ON halloffame.playerid = people.playerid
WHERE halloffame.inducted = 'Y';



-- division champs
SELECT yearid, name, park, w as wins, l as losses
FROM teams
WHERE teamrank = 1;



-- division last by year
WITH teams_count_per_season_table 
  AS (
	SELECT 
	  yearid AS season,  
	  MAX(teamrank) AS teams_count
	FROM teams
  	GROUP by season)
		SELECT teams_count_per_season_table.season, teams_count_per_season_table.teams_count, teams.teamrank, name, w AS wins, l AS losses
		FROM teams_count_per_season_table
		JOIN teams 
		ON teams_count_per_season_table.season = teams.yearid
		WHERE teams_count_per_season_table.teams_count = teams.teamrank
		;


-- top 20 earners per season (if col only in one table no need to specify table name)
SELECT salary, salaries.yearid, namefirst, namelast, salaries.teamid
FROM salaries
JOIN people
ON salaries.playerid = people.playerid
ORDER by salaries.salary DESC
LIMIT 20
;
