package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"
)

type SurfData struct {
	Year      int
	Month     int
	Day       int
	Hour      int
	Min       int
	WVHT      float64
	SwH       float64
	SwP       float64
	WWH       float64
	WWP       float64
	SwD       string
	WWD       string
	STEEPNESS string
	APD       float64
	MWD       float64
}

func main() {
	var err error

	// request http api
	res, err := http.Get("https://www.ndbc.noaa.gov/data/realtime2/46029.spec")
	if err != nil {
		log.Fatal(err)
	}

	log.Println("StatusCode:", res.StatusCode)

	// read body
	body, err := ioutil.ReadAll(res.Body)
	res.Body.Close()
	if err != nil {
		log.Fatal(err)
	}

	// log.Printf("Body: %s\n", body)
	var surf = string(body)
	var rows = strings.Split(surf, "\n")
	// var header = strings.Split(rows[0], " ")
	var allSurfData []SurfData

	for i := 2; i < len(rows); i++ {
		var row = strings.Split(rows[i], " ")
		if len(row) < 2 {
			continue
		}
		year, _ := strconv.Atoi(row[0])
		month, _ := strconv.Atoi(row[1])
		day, _ := strconv.Atoi(row[2])
		hour, _ := strconv.Atoi(row[3])
		min, _ := strconv.Atoi(row[4])
		WVHT, _ := strconv.ParseFloat(row[5], 64)
		SwH, _ := strconv.ParseFloat(row[6], 64)
		SwP, _ := strconv.ParseFloat(row[7], 64)
		WWH, _ := strconv.ParseFloat(row[8], 64)
		WWP, _ := strconv.ParseFloat(row[9], 64)
		SwD := row[10]
		WWD := row[11]
		STEEPNESS := row[12]
		APD, _ := strconv.ParseFloat(row[13], 64)
		MWD, _ := strconv.ParseFloat(row[14], 64)
		var surfData = SurfData{
			year,
			month,
			day,
			hour,
			min,
			WVHT,
			SwH,
			SwP,
			WWH,
			WWP,
			SwD,
			WWD,
			STEEPNESS,
			APD,
			MWD,
		}

		allSurfData = append(allSurfData, surfData)
	}

	fmt.Println(allSurfData)

	// parse json
	// type surfData struct {
	// 	Year string `rows`
	// }
	// surf := jsonSurf{}

	// err = json.Unmarshal(body, &surf)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// fmt.Printf("Received user %s ", body)

}
