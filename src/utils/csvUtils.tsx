import Papa from "papaparse";

export interface SkaterData {
  "Skater Name": string;
  Nationality: string;
  Gender: string;
  "Age at Competition": number;
  "Competition Name": string;
  Year: number;
  City: string;
  Country: string;
  Discipline: string;
  "Short Program Score": number;
  "Free Skate Score": number;
  "Total Score": number;
  "Technical Elements Score": number;
  "Program Components Score": number;
  Deductions: number;
  Rank: number;
  "Starting Order": number;
  "Previous Season Rank": number;
  "Number of Quad Jumps": number;
  "Rule Changes Implemented": string;
}

export const cityCoordinates: { [city: string]: [number, number] } = {
  Saitama: [139.6489, 35.8617],
  Helsinki: [24.9458, 60.1921],
  Milan: [9.19, 45.4642],
  Turin: [7.6869, 45.0703],
  Sochi: [39.7231, 43.6028],
  Tokyo: [139.6917, 35.6895],
  Stockholm: [18.0686, 59.3293],
  Dortmund: [7.4653, 51.5136],
  Calgary: [-114.0719, 51.0447],
  Gothenburg: [11.9746, 57.7089],
  Anaheim: [-117.9189, 33.8366],
  Greensboro: [-79.791, 36.0726],
  Pyeongchang: [128.6783, 37.3704],
  Moscow: [37.6173, 55.7558],
  "Salt Lake City": [-111.891, 40.7608],
  Seoul: [126.978, 37.5665],
  Minsk: [27.5615, 53.9006],
  "Las Vegas": [-115.1398, 36.1699],
  Graz: [15.4395, 47.0707],
  Montreal: [-73.5673, 45.5017],
  Everett: [-122.2021, 47.9789],
  Boston: [-71.0589, 42.3601],
  Barcelona: [2.1734, 41.3851],
  Shanghai: [121.4737, 31.2304],
  Chelyabinsk: [61.4026, 55.1644],
  Tallinn: [24.7536, 59.437],
  Chicago: [-87.6298, 41.8781],
  Nagoya: [136.9066, 35.1815],
  Ostrava: [18.292, 49.8209],
  "Taipei City": [121.5654, 25.033],
  Vancouver: [-123.1216, 49.2827],
  Sofia: [23.3219, 42.6977],
  Gangneung: [128.8965, 37.7556],
  Zagreb: [15.9819, 45.815],
  Beijing: [116.4074, 39.9042],
  Montpellier: [3.8767, 43.6117],
  Nashville: [-86.7816, 36.1627],
  "St. Petersburg": [30.3351, 59.9343],
};

export const countryAbbreviations: { [country: string]: string } = {
  Japan: "JPN",
  Spain: "ESP",
  Canada: "CAN",
  Italy: "ITA",
  Russia: "RUS",
  USA: "USA",
  "South Korea": "KOR",
  Kazakhstan: "KAZ",
  China: "CHN",
  Switzerland: "SUI",
  France: "FRA",
  "Czech Republic": "CZE",
  Latvia: "LAT",
  Uzbekistan: "UZB",
  Israel: "ISR",
  Azerbaijan: "AZE",
  Philippines: "PHI",
  Sweden: "SWE",
  Australia: "AUS",
  Belgium: "BEL",
  Georgia: "GEO",
  Estonia: "EST",
  Finland: "FIN",
  Germany: "GER",
  Poland: "POL",
};

// Global variable to store parsed data
let parsedData: SkaterData[] = [];

// Fetch and parse CSV file
export const fetchAndParseCSV = async (
  filePath: string
): Promise<SkaterData[]> => {
  return new Promise((resolve, reject) => {
    fetch(filePath)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse<SkaterData>(csvText, {
          header: true, // Use first row as headers
          skipEmptyLines: true,
          dynamicTyping: true, // Convert numbers automatically
          complete: (result) => {
            parsedData = result.data; // Update the global parsedData
            resolve(result.data);
          },
          error: (error: unknown) => {
            if (error instanceof Error) {
              console.error("Error parsing CSV:", error.message);
              reject(error.message);
            } else {
              console.error("An unknown error occurred during parsing");
              reject("Unknown error");
            }
          },
        });
      })
      .catch((error) => reject(error));
  });
};

// Calculate average total score using global parsed data
export const calculateAverageTotalScore = (): string => {
  const totalScores = parsedData
    .map((row) => row["Total Score"])
    .filter((score) => !isNaN(score));
  return totalScores.length > 0
    ? (
        totalScores.reduce((sum, score) => sum + score, 0) / totalScores.length
      ).toFixed(2)
    : "N/A";
};

// Filter data by discipline using global parsed data
export const filterByDiscipline = (discipline: string): SkaterData[] => {
  return parsedData.filter((row) => row.Discipline === discipline);
};

// Get top N skaters by total score using global parsed data
export const getTopSkaters = (topN: number): SkaterData[] => {
  return [...parsedData]
    .sort((a, b) => b["Total Score"] - a["Total Score"])
    .slice(0, topN);
};

export const getCompetitionsByCity = (): {
  [city: string]: {
    year: number;
    competitionName: string;
    country: string;
    coordinates: [number, number]; // Added coordinates
  }[];
} => {
  const cityCompetitions: {
    [city: string]: {
      year: number;
      competitionName: string;
      country: string;
      coordinates: [number, number];
    }[];
  } = {};

  parsedData.forEach((row) => {
    const city = row.City;
    const year = row.Year;
    const country = row.Country;
    const competitionName = row["Competition Name"];
    const coordinates = cityCoordinates[city] || [0, 0]; // Use 0,0 if city not found

    // Add entry for the city if not present
    if (!cityCompetitions[city]) {
      cityCompetitions[city] = [];
    }

    // Avoid duplicates
    if (
      !cityCompetitions[city].some(
        (comp) => comp.year === year && comp.competitionName === competitionName
      )
    ) {
      cityCompetitions[city].push({
        year,
        competitionName,
        country,
        coordinates,
      });
    }
  });
  // Sort competitions by year
  Object.keys(cityCompetitions).forEach((city) => {
    cityCompetitions[city].sort((a, b) => a.year - b.year);
  });

  return cityCompetitions;
};

export const getTopPerformerByCityAndYear = (
  city: string,
  year: number
): SkaterData | null => {
  const cityYearData = parsedData.filter(
    (row) => row.City === city && row.Year === year
  );

  if (cityYearData.length === 0) return null;

  // Find the skater with the highest Total Score
  return cityYearData.reduce((prev, curr) =>
    curr["Total Score"] > prev["Total Score"] ? curr : prev
  );
};

// get list of top 10 countries by number of participants + track their gender distribution
export const getTopCountriesByParticipants = (): {
  country: string;
  participants: number;
  genderDistribution: { Male: number; Female: number };
}[] => {
  const countryStats: {
    [country: string]: { participants: number; Male: number; Female: number };
  } = {};

  parsedData.forEach(({ Nationality, Gender }) => {
    if (!countryStats[Nationality]) {
      countryStats[Nationality] = { participants: 0, Male: 0, Female: 0 };
    }
    countryStats[Nationality].participants += 1;
    countryStats[Nationality][Gender === "Male" ? "Male" : "Female"] += 1;
  });

  return Object.entries(countryStats)
    .map(([country, stats]) => ({
      country,
      participants: stats.participants,
      genderDistribution: { Male: stats.Male, Female: stats.Female },
    }))
    .sort((a, b) => b.participants - a.participants)
    .slice(0, 10);
};

export const getTopChampionshipsByParticipants = (): {
  championship: string;
  participants: number;
  genderDistribution: { Male: number; Female: number };
}[] => {
  const championshipStats: {
    [championship: string]: {
      participants: number;
      Male: number;
      Female: number;
    };
  } = {};

  parsedData.forEach((row) => {
    if (!championshipStats[row["Competition Name"]]) {
      championshipStats[row["Competition Name"]] = {
        participants: 0,
        Male: 0,
        Female: 0,
      };
    }
    championshipStats[row["Competition Name"]].participants += 1;
    championshipStats[row["Competition Name"]][
      row.Gender === "Male" ? "Male" : "Female"
    ] += 1;
  });

  return Object.entries(championshipStats)
    .map(([championship, stats]) => ({
      championship,
      participants: stats.participants,
      genderDistribution: { Male: stats.Male, Female: stats.Female },
    }))
    .sort((a, b) => b.participants - a.participants)
    .slice(0, 10);
};

export const getGenderFrequencyTrendByYear = (): {
  year: number;
  total: number;
  male: number;
  female: number;
}[] => {
  const yearStats: {
    [year: number]: { total: number; male: number; female: number };
  } = {};

  parsedData.forEach(({ Year, Gender }) => {
    if (!yearStats[Year]) {
      yearStats[Year] = { total: 0, male: 0, female: 0 };
    }
    yearStats[Year].total += 1;
    yearStats[Year][Gender === "Male" ? "male" : "female"] += 1;
  });

  return Object.entries(yearStats)
    .map(([year, stats]) => ({
      year: Number(year),
      total: stats.total,
      male: stats.male,
      female: stats.female,
    }))
    .sort((a, b) => a.year - b.year);
};

export interface BoxPlotData {
  x: string; // Category (e.g., Nationality)
  y: [number, number, number, number, number]; // [min, Q1, median, Q3, max]
  outliers: number[]; // Extreme values
}

export const parseBoxPlotData = (
  category: string,
  valueKey: keyof SkaterData
): BoxPlotData[] => {
  const groupedData: { [key: string]: number[] } = {};

  // Group values by category (e.g., Nationality)
  parsedData.forEach((row: SkaterData) => {
    if (row[valueKey] && row[category as keyof SkaterData]) {
      const cat = row[category as keyof SkaterData] as string;
      if (!groupedData[cat]) groupedData[cat] = [];
      groupedData[cat].push(row[valueKey] as number);
    }
  });

  // Calculate boxplot stats and identify outliers
  const calculateStats = (
    values: number[]
  ): {
    stats: [number, number, number, number, number];
    outliers: number[];
  } => {
    values.sort((a, b) => a - b);
    const Q1 = values[Math.floor(values.length * 0.25)];
    const median = values[Math.floor(values.length * 0.5)];
    const Q3 = values[Math.floor(values.length * 0.75)];
    const IQR = Q3 - Q1;

    const min = Q1 - 1.5 * IQR;
    const max = Q3 + 1.5 * IQR;

    const outliers = values.filter((v) => v < min || v > max);
    const boundedValues = values.filter((v) => v >= min && v <= max);

    return {
      stats: [
        boundedValues[0],
        Q1,
        median,
        Q3,
        boundedValues[boundedValues.length - 1],
      ],
      outliers,
    };
  };

  return Object.entries(groupedData).map(([key, values]) => {
    const { stats, outliers } = calculateStats(values);
    return { x: key, y: stats, outliers };
  });
};

export interface HeatmapData {
  nationality: string;
  age: number;
  rankCount: number;
}

export const generateHeatmapData = (): HeatmapData[] => {
  const ageRange = Array.from({ length: 14 }, (_, i) => 15 + i); // Age 15 to 28
  const nationalitySet = new Set<string>();

  const heatmapData: { [key: string]: { [age: number]: number } } = {};

  parsedData.forEach(({ Nationality, "Age at Competition": age }) => {
    if (Nationality && age >= 15 && age <= 28) {
      nationalitySet.add(Nationality);
      if (!heatmapData[Nationality]) heatmapData[Nationality] = {};
      heatmapData[Nationality][age] = (heatmapData[Nationality][age] || 0) + 1;
    }
  });

  const result: HeatmapData[] = [];
  nationalitySet.forEach((nationality) => {
    ageRange.forEach((age) => {
      result.push({
        nationality,
        age,
        rankCount: heatmapData[nationality]?.[age] || 0,
      });
    });
  });

  // sort by nationality
  result.sort((a, b) => a.nationality.localeCompare(b.nationality));

  return result;
};

export const generateEdaScatterData = (): { x: number; y: number }[] => {
  const scatterData: { x: number; y: number }[] = [];

  parsedData.forEach((row) => {
    const startingOrder = row["Starting Order"];
    const totalScore = row["Total Score"];

    if (
      typeof startingOrder === "number" &&
      typeof totalScore === "number" &&
      !isNaN(startingOrder) &&
      !isNaN(totalScore)
    ) {
      scatterData.push({ x: startingOrder, y: totalScore });
    }
  });

  return scatterData;
};

export const generateGenderTechnicalProgramData = (
  gender: string
): { x: number; y: number }[] => {
  const scatterData: { x: number; y: number }[] = [];

  parsedData.forEach((row) => {
    const program = row["Program Components Score"];
    const technical = row["Technical Elements Score"];

    if (
      typeof program === "number" &&
      typeof technical === "number" &&
      !isNaN(program) &&
      !isNaN(technical) &&
      row.Gender === gender
    ) {
      scatterData.push({ x: technical, y: program });
    }
  });

  return scatterData;
};

export const generateShortFreeScatterData = (): { x: number; y: number }[] => {
  const scatterData: { x: number; y: number }[] = [];

  parsedData.forEach((row) => {
    const startingOrder = row["Short Program Score"];
    const totalScore = row["Free Skate Score"];

    if (
      typeof startingOrder === "number" &&
      typeof totalScore === "number" &&
      !isNaN(startingOrder) &&
      !isNaN(totalScore)
    ) {
      scatterData.push({ x: startingOrder, y: totalScore });
    }
  });

  return scatterData;
};
