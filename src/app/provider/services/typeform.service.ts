import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const typeformUrl = environment.typeformUrl + '&order_by[]=date_submit,desc&completed=true';
const isValidAddress = (address: string) => true;
const log = o => {
  console.log(o);
  return o;
};


const tfFields = {
  key: '',
  name: 'textfield_vTgZwE4Y3I6Y',
  telegram: 'textfield_F71roLDpOUb4',
  email: 'email_aKWCXIDFcnZR',
  mailto: 'email_aKWCXIDFcnZR',
  category: {
    contentCreator: 'list_Xt43TTUriX4l_choice_Z3VlnlERPv9T',
    graphicDesigner: 'list_Xt43TTUriX4l_choice_cyBbOu3teKSt',
    softwareDeveloper: 'list_Xt43TTUriX4l_choice_sUg8Msr1zCgQ',
    virtualAssistanct: 'list_Xt43TTUriX4l_choice_giQFciGp9pZO',
    other: 'list_Xt43TTUriX4l_choice_dprOpy5gv2nz',
  },
  other: 'textfield_Uqs4XSW4sjjd',
  portfolio: 'textfield_aXIiq2m0rYUK',
  resume: 'fileupload_vAgpmuGlZ3rE',
  crypto: 'listimage_AK1plCGY9qOb_choice',
  canya: 'listimage_SvUunmYWfeLW_choice',
  why: 'textarea_UCokvzmwA4R5',
  value: 'textarea_MAzgSOUXLTBo',
  feedback: 'listimage_KthMPDQiWsEc_choice',
  ethAddress: 'textfield_gklk3UOWQxgj',
  timestamp: 'date_submit'
};

@Injectable({
  providedIn: 'root'
})
export class TypeformService {

  constructor() { }

  getProviders(): Promise<any> {
    return fetch(typeformUrl)
      .then(resp => resp.json)
      .then(log)
      .then(this.formatTypeformData)
      .catch(err => console.log('TypeFormService Error: ', err));
  }

  formatTypeformData(applications) {
    return applications.map((item) => {
      if (isValidAddress(item['answers'][tfFields.ethAddress])) {
        return {
          key: item['token'],
          timestamp: new Date(item['metadata']['date_submit']).toLocaleString(),
          name: item['answers'][tfFields.name],
          telegram: item['answers'][tfFields.telegram],
          email: item['answers'][tfFields.email],
          mailto: 'mailto:' + item['answers'][tfFields.mailto] + '?Subject=CanYa%20Pioneers',
          category: {
            'Content Creator': item['answers'][tfFields.category.contentCreator],
            'Graphics Designers': item['answers'][tfFields.category.graphicDesigner],
            'Software Developers': item['answers'][tfFields.category.softwareDeveloper],
            'Virtual Assistants': item['answers'][tfFields.category.virtualAssistanct],
            'Other': item['answers'][tfFields.category.other]
          },
          other: item['answers'][tfFields.other],
          portfolio: item['answers'][tfFields.portfolio],
          resume: item['answers'][tfFields.resume],
          crypto: item['answers'][tfFields.crypto],
          canya: item['answers'][tfFields.canya],
          why: item['answers'][tfFields.why],
          value: item['answers'][tfFields.value],
          feedback: item['answers'][tfFields.feedback],
          ethAddress: item['answers'][tfFields.ethAddress]
        };
      }
    });
  }
}
