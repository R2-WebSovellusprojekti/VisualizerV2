import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Button } from 'react-bootstrap';
import './Charts.css';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000';

export default V5Chart;