--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.permissions (
    id integer NOT NULL,
    name character varying NOT NULL,
    duration interval(0),
    finish time(0) without time zone,
    CONSTRAINT permissions_time_not_null CHECK (((duration IS NOT NULL) OR (finish IS NOT NULL)))
);


--
-- Name: permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.permissions_id_seq OWNED BY public.permissions.id;


--
-- Name: students; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.students (
    id integer NOT NULL,
    firstname character varying NOT NULL,
    lastname character varying NOT NULL,
    tel character varying(21) NOT NULL
);


--
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;


--
-- Name: students_permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.students_permissions (
    id integer NOT NULL,
    student_id integer NOT NULL,
    permission_id integer NOT NULL,
    start timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: students_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.students_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: students_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.students_permissions_id_seq OWNED BY public.students_permissions.id;


--
-- Name: permissions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permissions ALTER COLUMN id SET DEFAULT nextval('public.permissions_id_seq'::regclass);


--
-- Name: students id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);


--
-- Name: students_permissions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students_permissions ALTER COLUMN id SET DEFAULT nextval('public.students_permissions_id_seq'::regclass);


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.permissions (id, name, duration, finish) FROM stdin;
7	Tel aviv	08:00:00	20:00:00
8	Parent permission	24:00:00	\N
5	Gas station	00:30:00	\N
6	Ramat	08:00:00	20:00:00
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.students (id, firstname, lastname, tel) FROM stdin;
91	Ada	Kestek	+905305922942
92	Ada Tuana	Dönmez	+972553018930
93	Adi	Weitzman	+972502309269
94	Ahmad	Titi	+972599377739
95	Alexander	Storozhev	+972586565828
96	Amanda	Fida	+355673761971
97	Amina	Minaidar	77077592700
98	Anna Elisabeth	Rosmulder	+31611656091
99	Annie	Pettersson	+972547961189
100	Athena	Mandal	4915204048627
101	Basel	Naamneh	+972522539162
102	Ben	Aalsvel	+31624893399
103	Bram	Gerrits	+972543028977
104	Brandon	Kanyerezi	+972547959785
105	Camilla	Bertone	+972552428567
106	Carlota	Martins da Silva Gentil Anastácio	+972505850160
107	Caterina	Peyron	+972552428568
108	Clara	Delso Díaz	+972552428544
109	Dana	Ilani	+972542228071
110	Dana	Kharaz	+972537859918
111	Dana	Poliva	+972543495595
112	Daniel 	Zadka	+972556682769
113	Dariya	Akhmediyeva	77473672362
114	Delphine	de Bruyn	+32486480274
115	Douae Lkheire	Loukili	+972547945247
116	Enis	Tyxhari	+355674644242
117	Fahd	El Khamlichi	+972543306915
118	Frenk 	Kajtalli	+355699701939
119	Gali	Shamir	+972544364634
120	Gent	Jusufi	+38349140505
121	Gil	Weiss	+972533823393
122	Giulia	Calamai	393296640256
123	Idan	Fish-Keitner	+972506842466
124	Jessica Beauty Wede	Smith	+972544898209
125	Joshua Andrew	Otika	256754102937
126	Julia	Heiman	+972547996123
127	Keon	Konica	+355694027252
128	Keren	Lindenberg	+972527350191
129	Khanh	Le Duy	+84935669955
130	Lani	Hampel	+972586899366
131	Liya	Dvir	+972545905451
132	Luara	Alves Kamada	+5513996896079
133	Maisoona	Ighbarieh	+5513996896079
134	Marina	Beltrán Miñones	+972543028821
135	Mark	Rybakov	+79504550531
136	Mehdi	Atmani	573137757033
137	Mika	Talor	+972523900378
138	Nadeen	Zahran	+972552899494
139	Natalie Ilana	Horlau	+972542220477
140	Neomi Yona	Orni	+972547474866
141	Newton	Khounvongsa	+972559846133
142	Nina	Karvat Maizel	+972544395396
143	Noa	Fleiderman	+972556805518
144	Noam	Vashdy	+972543422636
145	Ofir	Aviv	+972546746500
146	Olena	Kovalenko	+972547960175
147	Omer	Carmeli	+972505493040
148	Ori	Shpitzer	+972584090605
149	Ramez	Bassous	+972547961254
150	Saul	Wagner	+972524625989
151	Tawfeeq	Awesat	+972549455501
152	Timofey Artemovich	Galitsky	+79128824171
153	Toto	Dotan	+972547358502
154	Uyen	Le	+972539538275
155	Xiaofan (Zena)	Chen	+972507660938
156	Yalun	Liu	+972585532033
157	Yashwardhana	Khilari	919421963163
158	Yasmeena	Ighbarieh	+972584022109
159	Zhiyu	Xu	8613167327932
\.


--
-- Data for Name: students_permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.students_permissions (id, student_id, permission_id, start) FROM stdin;
\.


--
-- Name: permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.permissions_id_seq', 8, true);


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.students_id_seq', 159, true);


--
-- Name: students_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.students_permissions_id_seq', 90, true);


--
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- Name: students_permissions students_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students_permissions
    ADD CONSTRAINT students_permissions_pkey PRIMARY KEY (id);


--
-- Name: students_permissions students_permissions_student_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students_permissions
    ADD CONSTRAINT students_permissions_student_id_key UNIQUE (student_id);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- Name: students_permissions students_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students_permissions
    ADD CONSTRAINT students_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON DELETE CASCADE;


--
-- Name: students_permissions students_permissions_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students_permissions
    ADD CONSTRAINT students_permissions_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

