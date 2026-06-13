import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { GenAiService } from '../../services/gen-ai.service';

@Component({
  selector: 'app-chat-page',
  imports: [HeaderComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent {
  private formBuilder = inject(FormBuilder);
  private genAI = inject(GenAiService);

  formChat: FormGroup = this.formBuilder.group({
    query: ['', Validators.required]
  });
  isLoading = false;
  responseChat = ''
  isEnbleVoice = false;

  askGemini() {
    this.isLoading = true;
    this.genAI.askGemini(this.formChat.value.query).then((data) => {
      this.responseChat = data
      this.isLoading = false
      this.formChat.reset()
    })
  }

  talkGemini() {
    this.isEnbleVoice = true;
    this.genAI.talkGemini().catch((error) => {
      console.error("Error starting audio conversation with Gemini Live", error);
    });
  }

  stopTalkGemini() {
    this.isEnbleVoice = false;
    this.genAI.stopTalkGemini().catch((error) => {
      console.error("Error stopping audio conversation with Gemini Live", error);
    });

  }
}
