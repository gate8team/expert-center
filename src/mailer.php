<?php
  class Mailer {
    private $from;
    private $name;
    private $phone;
    private $_toMails = array(
      'me.antony.rain@gmail.com'
    );
    
    public function __construct($config) {
      $this->from = $config['from'];
      $this->name = $config['name'];
      $this->phone = $config['phone'];
    }
    
    public function sendMail() {
      $subject = 'Заказ с сайта - ' . $this->from;
      $message = 'Имя: ' . $this->name . ', Телефон: ' . $this->phone;

      foreach ($this->_toMails as $mail) {
        mail($mail, $subject, $message);
      }
    }
  }

  if (isset($_POST['from']) && isset($_POST['name']) && isset($_POST['phone'])) {
    $mailer = new Mailer(array(
      'from' => $_POST['from'],
      'name' => $_POST['name'],
      'phone' => $_POST['phone']
    ));
    
    $mailer->sendMail();
  }
?>
