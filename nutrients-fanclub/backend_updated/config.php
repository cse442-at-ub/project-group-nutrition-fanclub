<?php
    class DbConn{
        private $server = 'oceanus.cse.buffalo.edu';
        private $database = "cse442_2023_fall_team_ae_db";
        private $user = 'ryankhan';
        private $password = '50389982';
        
        public function connect() {
            try {
                $conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->database, $this->user, $this->password);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $conn;
            } catch (\Exception $e) {
				echo "Database Error: " . $e->getMessage();
			}
        }

    }