package main

import (
    "log"
    "gopkg.in/mgo.v2"
    "net/http"
    "time"
    "flag"
    "github.com/gorilla/mux"

    "tracker/api"
)

func main() {
  var dbhost string
  var dir string
  var dbInfo mgo.DialInfo

  flag.StringVar(&dir, "dir", "/usr/src/myapp", "the directory to serve files from. Defaults to /usr/src/myapp")
  flag.StringVar(&dbhost, "dbhost", "mongodb", "mongodb host name. Defaults to mongodb")
  flag.StringVar(&dbInfo.Username, "dbuser", "ebisc", "mongodb user name. Defaults to ebisc")
  flag.StringVar(&dbInfo.Password, "dbpass", "ebisc", "mongodb password. Defaults to ebisc")
  flag.StringVar(&dbInfo.Database, "dbname", "ebisc", "mongodb database name. Defaults to ebisc")
  flag.Parse()

  dbInfo.Addrs = []string{dbhost}

  r := mux.NewRouter()
  r.PathPrefix("/static/").Handler(http.FileServer(http.Dir(dir)))

  api.Serve(r, &dbInfo)

  r.PathPrefix("/").Handler(&angularDir{dir})

  srv := &http.Server{
    Handler: r,
    Addr: ":8000",
    WriteTimeout: 15 * time.Second,
    ReadTimeout:  15 * time.Second,
    // MaxHeaderBytes: 1 << 20, // Default
    // ErrorLog: 
  }

  log.Fatal(srv.ListenAndServe())

}

