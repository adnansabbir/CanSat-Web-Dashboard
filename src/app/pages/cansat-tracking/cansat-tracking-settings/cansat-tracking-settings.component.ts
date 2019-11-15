import {Component, OnDestroy, OnInit} from '@angular/core';
import {CansatTrackingService} from '../services/cansat-tracking.service';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cansat-tracking-settings',
  templateUrl: './cansat-tracking-settings.component.html',
  styleUrls: ['./cansat-tracking-settings.component.scss']
})
export class CansatTrackingSettingsComponent implements OnInit, OnDestroy {
  subscriptionList: Subscription[] = [];
  settingsForm: FormGroup;

  constructor(private cansatTrackingService: CansatTrackingService,
              private router: Router) {
  }

  ngOnDestroy(): void {
    this.subscriptionList.map(subscription => subscription.unsubscribe());
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.settingsForm = new FormGroup({
      access_token: new FormControl(this.cansatTrackingService.mapOptions.access_token, Validators.required),
      model_url: new FormControl(this.cansatTrackingService.mapOptions.model_url, Validators.required),
      chrome_serial_reader_app_id: new FormControl(this.cansatTrackingService.chromeSerialReaderAppId, Validators.required),
    });
  }

  onSubmit() {
    const data = this.settingsForm.value;
    this.cansatTrackingService.storeMapOptions({
      access_token: data.access_token,
      model_url: data.model_url
    }, data.chrome_serial_reader_app_id).then(res => {
      if (res === true) {
        this.cansatTrackingService.updateSiteConfigs();
        this.router.navigate(['./cansat-tracking']);
      }
    });
    console.log(this.settingsForm.value);
  }
}
