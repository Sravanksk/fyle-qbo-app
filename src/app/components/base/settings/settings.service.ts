import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from '../general.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private generalService: GeneralService) { }

  getFyleCredentials(workspace_id: number): Observable<any> {
    return this.generalService.get('/workspaces/' + workspace_id + '/credentials/fyle/', {});
  }
  
  deleteFyleCredentials(workspace_id: number): Observable<any> {
    return this.generalService.post('/workspaces/' + workspace_id + '/credentials/fyle/delete/', {});
  }

  deleteQBOCredentials(workspace_id: number): Observable<any> {
    return this.generalService.post('/workspaces/' + workspace_id + '/credentials/qbo/delete/', {});
  }

  getQBOCredentials(workspace_id: number): Observable<any> {
    return this.generalService.get('/workspaces/' + workspace_id + '/credentials/qbo/', {});
  }

  connectFyle(workspace_id: number, authorization_code: string): Observable<any> {
    return this.generalService.post('/workspaces/' + workspace_id + '/connect_fyle/authorization_code/', {
      code: authorization_code
    });
  }

  connectQBO(workspace_id: number, authorization_code: string, realm_id: string): Observable<any> {
    return this.generalService.post('/workspaces/' + workspace_id + '/connect_qbo/authorization_code/', {
      code: authorization_code,
      realm_id: realm_id
    });
  }

  postSettings(workspace_id: number, next_run: string, hours: number, schedule_enabled: boolean) {
    return this.generalService.post(`/workspaces/${workspace_id}/settings/`, {
      next_run: next_run,
      hours: hours,
      schedule_enabled: schedule_enabled
    });
  }

  getSettings(workspace_id: number) {
    return this.generalService.get(`/workspaces/${workspace_id}/settings/`, {});
  }
}
