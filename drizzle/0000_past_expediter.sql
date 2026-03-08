CREATE TYPE "public"."address_provider" AS ENUM('osm', 'google', 'here', 'mapbox');--> statement-breakpoint
CREATE TYPE "public"."exception_type" AS ENUM('added', 'removed');--> statement-breakpoint
CREATE TYPE "public"."route_type" AS ENUM('bus', 'tram', 'rail', 'subway', 'ferry', 'cable_car', 'gondola', 'funicular');--> statement-breakpoint
CREATE TYPE "public"."scrape_status" AS ENUM('pending', 'running', 'success', 'failed');--> statement-breakpoint
CREATE TABLE "addresses_metrics" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "addresses_metrics_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"address_id" integer NOT NULL,
	"click_time" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "addresses_raw" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "addresses_raw_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"address_id" integer NOT NULL,
	"raw" jsonb NOT NULL,
	"provider" "address_provider" NOT NULL,
	"external_id" varchar(255),
	CONSTRAINT "addresses_raw_provider_external_id_unique" UNIQUE("provider","external_id")
);
--> statement-breakpoint
CREATE TABLE "addresses" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "addresses_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"display_name" varchar NOT NULL,
	"street" varchar(255),
	"house_number" varchar(20),
	"city" varchar(100),
	"postcode" varchar(20),
	"country" varchar(2),
	"coordinates" geography(Point,4326) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "calendar_dates" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "calendar_dates_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"calendar_id" integer NOT NULL,
	"date" date NOT NULL,
	"exception_type" "exception_type" NOT NULL,
	CONSTRAINT "calendar_dates_calendar_id_date_unique" UNIQUE("calendar_id","date")
);
--> statement-breakpoint
CREATE TABLE "calendar" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "calendar_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"monday" boolean DEFAULT false NOT NULL,
	"tuesday" boolean DEFAULT false NOT NULL,
	"wednesday" boolean DEFAULT false NOT NULL,
	"thursday" boolean DEFAULT false NOT NULL,
	"friday" boolean DEFAULT false NOT NULL,
	"saturday" boolean DEFAULT false NOT NULL,
	"sunday" boolean DEFAULT false NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "carriers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "carriers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"homepage" varchar,
	"contact_phone" varchar(20),
	"contact_email" varchar(255),
	"timezone" varchar(64) NOT NULL,
	"country" varchar(2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fare_attributes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "fare_attributes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"route_id" integer NOT NULL,
	"price" integer NOT NULL,
	"currency" varchar(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "routes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "routes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"carrier_id" integer NOT NULL,
	"short_name" varchar(50) NOT NULL,
	"long_name" varchar(255),
	"description" varchar,
	"route_type" "route_type" NOT NULL,
	"color" varchar(6),
	"text_color" varchar(6),
	"origin_stop" integer NOT NULL,
	"destination_stop" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scr_processed" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "scr_processed_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"run_id" integer NOT NULL,
	"target_id" integer NOT NULL,
	"output_filepath" varchar NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scr_runs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "scr_runs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"target_id" integer NOT NULL,
	"status" "scrape_status" DEFAULT 'pending' NOT NULL,
	"filepath" varchar,
	"error_message" varchar,
	"started_at" timestamp,
	"finished_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scr_targets" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "scr_targets_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"url" varchar NOT NULL,
	"config" jsonb NOT NULL,
	"schedule_cron" varchar(100),
	"is_active" boolean DEFAULT true NOT NULL,
	"carrier_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stops_metrics" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "stops_metrics_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"stop_id" integer NOT NULL,
	"click_time" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stops" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "stops_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"coordinates" geography(Point,4326) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trip_stops" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "trip_stops_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"trip_id" integer NOT NULL,
	"stop_id" integer NOT NULL,
	"stop_order" integer NOT NULL,
	"arrival_time" time NOT NULL,
	"departure_time" time NOT NULL,
	CONSTRAINT "trip_stops_trip_id_stop_order_unique" UNIQUE("trip_id","stop_order")
);
--> statement-breakpoint
CREATE TABLE "trips" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "trips_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"route_id" integer NOT NULL,
	"calendar_id" integer NOT NULL,
	"duration" integer,
	"distance" integer
);
--> statement-breakpoint
ALTER TABLE "addresses_metrics" ADD CONSTRAINT "addresses_metrics_address_id_addresses_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "addresses_raw" ADD CONSTRAINT "addresses_raw_address_id_addresses_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "calendar_dates" ADD CONSTRAINT "calendar_dates_calendar_id_calendar_id_fk" FOREIGN KEY ("calendar_id") REFERENCES "public"."calendar"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fare_attributes" ADD CONSTRAINT "fare_attributes_route_id_routes_id_fk" FOREIGN KEY ("route_id") REFERENCES "public"."routes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "routes" ADD CONSTRAINT "routes_carrier_id_carriers_id_fk" FOREIGN KEY ("carrier_id") REFERENCES "public"."carriers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "routes" ADD CONSTRAINT "routes_origin_stop_stops_id_fk" FOREIGN KEY ("origin_stop") REFERENCES "public"."stops"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "routes" ADD CONSTRAINT "routes_destination_stop_stops_id_fk" FOREIGN KEY ("destination_stop") REFERENCES "public"."stops"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scr_processed" ADD CONSTRAINT "scr_processed_run_id_scr_runs_id_fk" FOREIGN KEY ("run_id") REFERENCES "public"."scr_runs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scr_processed" ADD CONSTRAINT "scr_processed_target_id_scr_targets_id_fk" FOREIGN KEY ("target_id") REFERENCES "public"."scr_targets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scr_runs" ADD CONSTRAINT "scr_runs_target_id_scr_targets_id_fk" FOREIGN KEY ("target_id") REFERENCES "public"."scr_targets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scr_targets" ADD CONSTRAINT "scr_targets_carrier_id_carriers_id_fk" FOREIGN KEY ("carrier_id") REFERENCES "public"."carriers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stops_metrics" ADD CONSTRAINT "stops_metrics_stop_id_stops_id_fk" FOREIGN KEY ("stop_id") REFERENCES "public"."stops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trip_stops" ADD CONSTRAINT "trip_stops_trip_id_trips_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trip_stops" ADD CONSTRAINT "trip_stops_stop_id_stops_id_fk" FOREIGN KEY ("stop_id") REFERENCES "public"."stops"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trips" ADD CONSTRAINT "trips_route_id_routes_id_fk" FOREIGN KEY ("route_id") REFERENCES "public"."routes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trips" ADD CONSTRAINT "trips_calendar_id_calendar_id_fk" FOREIGN KEY ("calendar_id") REFERENCES "public"."calendar"("id") ON DELETE restrict ON UPDATE no action;